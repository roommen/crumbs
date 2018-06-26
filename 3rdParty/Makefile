ROOT = ..

include $(ROOT)/make-include.mk

SQLITE_NAME := sqlite-autoconf
SQLITE_VERSION := 3130000
SQLITE_PATH := $(SQLITE_NAME)-$(SQLITE_VERSION)
SQLITE_PKG := $(SQLITE_PATH).tar.gz

all: $(SQLITE_PATH) install

$(SQLITE_PATH):
	tar zxf $(SQLITE_PKG) && cd $(SQLITE_PATH)
	cd $(SQLITE_PATH) && ./configure --prefix=/usr --enable-threadsafe CFLAGS="-Os -DSQLITE_OMIT_TRIGGERS"
	cd $(SQLITE_PATH) && make

install:
	cd $(SQLITE_PATH) && sudo make install
	cp -f $(SQLITE_PATH)/sqlite3.o $(INSTALL_LIB_DIR)

clean: clean-sqlite

clean-sqlite:
	cd $(SQLITE_PATH) && make clean
	rm -Rf $(SQLITE_PATH)
	rm -f $(INSTALL_LIB_DIR)/sqlite3.o
	rm -f ~/$(CLOUDBREW_HASH_DBNAME)
	rm -f ~/$(CLOUDBREW_HASH_DBNAME).log
