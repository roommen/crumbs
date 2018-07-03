import sqlite3
from common.CommonDefs import db_loc, db_name


def create_subscriptions():
    connection, cursor = None, None
    try:
        connection = sqlite3.connect(db_loc+db_name)
        cursor = connection.cursor()
        cursor.execute('''
            CREATE TABLE subscriptions(sub_id INTEGER PRIMARY KEY, group_id INTEGER,
                user_id INTEGER, contribution TEXT,
                FOREIGN KEY(group_id) REFERENCES groups(group_id),
                FOREIGN KEY(user_id) REFERENCES users(user_id))
        ''')
        connection.commit()
        print("Table subscriptions created successfully.")
        connection.close()
    except Exception as e:
        print("Error occurred - ", e)
        connection.close()


if __name__ == '__main__':
    create_subscriptions()
