1. bringup_crumbs_schema.py - The umbrella script to build up the DB schema for CRUMBS. This will inturn call all the create_*.py files to create all the tables.<br/>
2. create_*.py - Scripts that may be called individually to create all the tables inside the database.<br/><br/>
3. teardown_crumbs_schema.py - The umbrella script to tear down the DB schema for CRUMBS. This will inturn call all the drop_*.py files to drop all the tables.<br/>
4. drop_*.py - Scripts that may be called individually to drop all the tables inside the database.<br/>
