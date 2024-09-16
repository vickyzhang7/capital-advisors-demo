from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os  
from dotenv import load_dotenv  


load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv('ALPHAVANTAGE_API_KEY')

def get_stock_data(symbol):
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={API_KEY}'
    response = requests.get(url)
    data = response.json()

    if 'Time Series (Daily)' in data:
        daily_data = data['Time Series (Daily)']
        dates = list(daily_data.keys())
        closing_prices = [float(daily_data[date]['4. close']) for date in dates]

        return {
            'dates': dates[:10],  
            'prices': closing_prices[:10]
        }
    else:
        return {'error': 'Unable to fetch data for the symbol'}

@app.route('/stock/<symbol>', methods=['GET'])
def stock(symbol):
    data = get_stock_data(symbol)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
