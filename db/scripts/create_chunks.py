import sqlite3
from common.CommonDefs import db_loc, db_name


def create_chunks():
    connection, cursor = None, None
    try:
        connection = sqlite3.connect(db_loc+db_name)
        cursor = connection.cursor()
        cursor.execute('''
            CREATE TABLE chunks(chunk_id INTEGER PRIMARY KEY, file_id INTEGER, chunk_name TEXT,
                FOREIGN KEY(file_id) REFERENCES files(file_id))
        ''')
        connection.commit()
        print("Table chunks created successfully.")
        connection.close()
    except Exception as e:
        print("Error occurred - ", e)
        connection.close()


if __name__ == '__main__':
    create_chunks()
