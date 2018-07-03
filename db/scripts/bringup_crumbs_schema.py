from common.CommonDefs import db_loc, db_name
import os


def bringup_crumbs_schema():
    connection, cursor = None, None

    try:
        os.system('python create_users.py')
        os.system('python create_admin.py')
        os.system('python create_groups.py')
        os.system('python create_files.py')
        os.system('python create_subscriptions.py')
        os.system('python create_threads.py')
        os.system('python create_uploads.py')

        print("Schema created successfully for Crumbs Master")
    except Exception as e:
        print("Error occurred - ", e)

if __name__ == '__main__':
    bringup_crumbs_schema()
