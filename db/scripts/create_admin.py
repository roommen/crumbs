import sqlite3
from common.CommonDefs import db_loc, db_name


def create_admin():
    connection, cursor = None, None
    try:
        connection = sqlite3.connect(db_loc+db_name)
        cursor = connection.cursor()
        cursor.execute('''
            CREATE TABLE admin(admin_id INTEGER PRIMARY KEY, user_id INTEGER,
                FOREIGN KEY(user_id) REFERENCES users(user_id))
        ''')
        connection.commit()
        print("Table admin created successfully.")
        connection.close()
    except Exception as e:
        # connection.rollback()
        print("Error occurred - ", e)
        connection.close()


if __name__ == '__main__':
    create_admin()
