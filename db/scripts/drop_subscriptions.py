import sqlite3
from common.CommonDefs import db_loc, db_name


def drop_subscriptions():
    connection, cursor = None, None
    try:
        connection = sqlite3.connect(db_loc+db_name)
        cursor = connection.cursor()
        cursor.execute('''
            DROP TABLE subscriptions
        ''')
        connection.commit()
        print("Table subscriptions dropped successfully.")
        connection.close()
    except Exception as e:
        print("Error occurred - ", e)
        connection.close()


if __name__ == '__main__':
    drop_subscriptions()
