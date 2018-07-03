import sqlite3
from common.CommonDefs import db_loc, db_name


def create_users():
    connection, cursor = None, None
    try:
        connection = sqlite3.connect(db_loc+db_name)
        cursor = connection.cursor()
        cursor.execute('''
            CREATE TABLE users(user_id INTEGER PRIMARY KEY, uname TEXT,
                fname TEXT, user_pic TEXT, lname TEXT, drive TEXT, token TEXT)
        ''')
        connection.commit()
        print("Table users created successfully.")
        connection.close()
    except Exception as e:
        print("Error occurred - ", e)
        connection.close()


if __name__ == '__main__':
    create_users()
