import sqlite3
from common.CommonDefs import db_loc, db_name
import os


def teardown_crumbs_schema():
    connection, cursor = None, None

    try:
        connection = sqlite3.connect(db_loc+db_name)

        os.system('python drop_users.py')
        os.system('python drop_admin.py')
        os.system('python drop_groups.py')
        os.system('python drop_files.py')
        os.system('python drop_subscriptions.py')
        os.system('python drop_threads.py')
        os.system('python drop_uploads.py')

        print("Schema dropped successfully for Crumbs")
        connection.close()
    except Exception as e:
        print("Error occurred - ", e)
        connection.close()

if __name__ == '__main__':
    teardown_crumbs_schema()
