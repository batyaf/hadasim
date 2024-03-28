import pyodbc
from datetime import datetime

connect_str = ('DRIVER={SQL Server};'
               'SERVER=BATYA\SQLEXPRESS;'
               'DATABASE=Hmo')
# 'Trusted_Connection=yes;')

list = [0] * 31
today = datetime.date.today()

with pyodbc.connect(connect_str) as connection:
    cursor = connection.cursor()
    query = """
    SELECT 
        CASE 
            WHEN DATEDIFF(DAY, DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1), [PositivityDate]) >= 0 
            THEN DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1)
            ELSE [PositivityDate]
        END AS PositivityDate,
        [recoveryDate]
    FROM 
        [dbo].[coronaPatient]
    WHERE 
        DATEDIFF(DAY, [PositivityDate], GETDATE()) >= 0 
        AND (DATEDIFF(DAY, DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1), [recoveryDate]) >= 0 OR [recoveryDate] IS NULL)
    """
    cursor.execute(query)


    rows = cursor.fetchall()
    for row in rows:
        date_p = datetime.strptime(date_string, row.PositivityDate)
        day_start = int(date_object.strftime('%d'))
        if row.PositivityDate ==None:
            date_r = datetime.strptime(date_string, today)
            day_end = int(date_object.strftime('%d'))
        else:
            date_r = datetime.strptime(date_string, row.PositivityDate)
            day_end = int(date_object.strftime('%d'))
        for d in range(day_start,day_end+1):
            list[d]=+1
        print (list)

    cursor.close()

