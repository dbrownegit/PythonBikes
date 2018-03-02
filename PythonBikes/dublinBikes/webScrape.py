import time
from time import strftime, gmtime
import os.path
import sqlite3
import pandas as pd
from datetime import datetime


#print(df.loc[33]['name'])



def update(end, url, freq):
    #create table
    conn = sqlite3.connect('dublinbikes020318.sqlite')
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS dublinbikes
                      (address text, available_bike_stands integer, available_bikes integer,
                       banking text, bike_stands integer, bonus integer,contract_name text,last_update integer, name text,
                       number integer, position real, status text, scrape_datetime integer)
                   """)
    conn.commit()
    #get the data
    while time.time() <= end:
        df = pd.read_json(url) #put into data frame
        df['scrape_datetime'] = strftime("%d-%m-%Y %H:%M:%S" , gmtime())  
        df['last_update'] = pd.to_datetime(df['last_update'],unit='ms')
        #print(df.loc[33]['name'])
        stringcol = df.select_dtypes(['object']).columns
        for i in stringcol:
            df[i] = df[i].astype('str')
        conn = sqlite3.connect('dublinbikes020318.sqlite')
        cursor = conn.cursor()   
    #Load the csv

        df.to_sql(name="dublinbikes", con=conn, if_exists="append", index=False)
        df.to_csv('dbikesdata.csv', mode='a', header=True, index=False)  
        conn.commit()
        conn.close()
        time.sleep(60) 

url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=30ae8e68ff6ff0175b969c62ee4bd43c4c32bb0f'
# Set how long want to run for
numMins = 525600
freq = 3000
#end = time.time()+ 3600 # 1 hour in seconds
end = time.time() + (60*numMins) # 60 seconds multiplied by whatever minutes require to run for

# Invoke the function update to get data
update(end, url, freq)