import sqlite3
from common.CommonDefs import db_loc, db_name


def drop_threads():
    connection, cursor = None, None
    try:
        connection = sqlite3.connect(db_loc+db_name)
        cursor = connection.cursor()
        cursor.execute('''
            DROP TABLE threads
        ''')
        connection.commit()
        print("Table threads dropped successfully.")
        connection.close()
    except Exception as e:
        print("Error occurred - ", e)
        connection.close()


if __name__ == '__main__':
    drop_threads()
