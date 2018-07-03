import sqlite3
from common.CommonDefs import db_loc, db_name


def create_groups():
    connection, cursor = None, None
    try:
        connection = sqlite3.connect(db_loc+db_name)
        cursor = connection.cursor()
        cursor.execute('''
            CREATE TABLE groups(group_id INTEGER PRIMARY KEY, admin_id INTEGER,
                group_name TEXT, members TEXT,
                FOREIGN KEY(admin_id) REFERENCES admin(admin_id))
        ''')
        connection.commit()
        print("Table groups created successfully.")
        connection.close()
    except Exception as e:
        # connection.rollback()
        print("Error occurred - ", e)
        connection.close()


if __name__ == '__main__':
    create_groups()
