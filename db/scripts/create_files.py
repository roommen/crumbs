import sqlite3
from common.CommonDefs import db_loc, db_name


def create_files():
    connection, cursor = None, None
    try:
        connection = sqlite3.connect(db_loc+db_name)
        cursor = connection.cursor()
        cursor.execute('''
            CREATE TABLE files(file_id INTEGER PRIMARY KEY, group_id INTEGER,
                file_name TEXT, file_type TEXT, file_size TEXT,
                FOREIGN KEY(group_id) REFERENCES groups(group_id))
        ''')
        connection.commit()
        print("Table files created successfully.")
        connection.close()
    except Exception as e:
        # connection.rollback()
        print("Error occurred - ", e)
        connection.close()


if __name__ == '__main__':
    create_files()
