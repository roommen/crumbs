import sqlite3
from common.CommonDefs import db_loc, db_name


def create_threads():
    connection, cursor = None, None
    try:
        connection = sqlite3.connect(db_loc+db_name)
        cursor = connection.cursor()
        cursor.execute('''
            CREATE TABLE threads(thread_id INTEGER PRIMARY KEY, group_id INTEGER,
                user_id INTEGER, status TEXT,
                FOREIGN KEY(group_id) REFERENCES groups(group_id),
                FOREIGN KEY(user_id) REFERENCES users(user_id))
        ''')
        connection.commit()
        print("Table threads created successfully.")
        connection.close()
    except Exception as e:
        # connection.rollback()
        print("Error occurred - ", e)
        connection.close()


if __name__ == '__main__':
    create_threads()
