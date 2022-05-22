from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import json

app = Flask(__name__)
CORS(app)

df_cars = pd.read_csv('data/cars.csv')
df_sales = pd.read_csv('data/cars_sales.csv')
joined = pd.read_csv('data/cars_dataset.csv')

@app.route('/')
def cars_data():
    return pd.read_csv('data/cars_sales.csv').to_json()

@app.route('/dashboard')
def cars_dashboard():
    return {
        'sales': df_sales.sum()[2:].to_json(),
        'top_brand_of_year': df_sales.sort_values(by='2022', ascending=False).head(1)['Make'].item(),
        'top_brand_of_month': df_sales.sort_values(by='June_2022', ascending=False).head(1)['Make'].item()
    }

@app.route('/leading/models/5')
def cars_leading_models():
    top5 = df_sales.sort_values(by='June_2022', ascending=False).head()
    new_df = pd.DataFrame()
    for i in range(len(top5)):
        new_df = pd.concat([new_df, df_cars[(df_cars['Make'] == top5.iloc[i]['Make']) & (df_cars['Model'] == top5.iloc[i]['Model'])]], axis=0)
    ans = top5.join(new_df[['Make', 'Model', 'Ex-Showroom_Price']].groupby(['Make', 'Model']).mean(), on=['Make', 'Model'])
    ans['total_sales'] = ans['January_2022'] + ans['February_2022'] + ans['March_2022'] + ans['April_2022'] + ans['May_2022'] + ans['June_2022']
    ans.rename(columns={'Ex-Showroom_Price': 'price', 'Make': 'brand', 'Model': 'model'}, inplace=True)
    return ans.to_json(orient='records')

@app.route('/cars/<query>')
def cars_grouping(query):
    column = '_'.join(query.split())
    temp = df_cars[['Model', column]].groupby(by=column).count()['Model'].to_dict()
    obj = {
        'key': list(temp.keys()),
        'value': list(temp.values())
    }
    return obj

@app.route('/sales/<query>')
def sales_grouping(query):

    temp = joined[['Make', 'Model', '2022', query]] \
    .groupby(query) \
    .mean()
    
    temp = round(temp * 100 / temp.sum(), 2)

    if(query == 'City_Mileage_in_km_per_litre'):
        temp = temp.groupby(pd.cut(temp.index, np.arange(0, max(joined[query])+5, 5))).sum()
        temp.index = temp.index.astype(str)

    temp = temp.to_dict()['2022']
    obj = {
        'key': list(temp.keys()),
        'value': list(temp.values())
    }
    return obj