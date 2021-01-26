from flask import Flask, render_template, request, redirect, url_for, session, jsonify 
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL 
import MySQLdb.cursors 
import datetime
import json
import re 


app = Flask(__name__) 


app.secret_key = 'secret'

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'Inframind'


mysql = MySQL(app) 

#######################
# DASHBOARD ENDPOINTS #
#######################

@app.route('/') 
@app.route('/dashboard', methods =['GET']) 
def home(): 
	return "Dashboard! Not ready yet." 

####################
# CLIENT ENDPOINTS #
####################

# endpoint to create new client
@app.route("/client", methods=["POST"])
def add_client():
    try:
        name = request.json['name']
        image = request.json['image']
        phone = request.json['phone']
        email = request.json['email']
        addr1 = request.json['addr1']
        addr2 = request.json['addr2']
        city = request.json['city']
        state = request.json['state']
        pin = request.json['pin']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO `customers` (`cid`, `name`, `csat`, `address1`, `address2`, `city`, `state`, `country`, `pin`, `phone`, `email`, `image`, `created_at`, `modified_at`) VALUES (NULL, '"+str(name)+"', '2.5', '"+str(addr1)+"', '"+str(addr2)+"', '"+str(city)+"', '"+str(state)+"', 'India', '"+str(pin)+"', '"+str(phone)+"', '"+str(email)+"', '"+str(image)+"', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)")
        app.logger.info("Inserted 1 Customer")
        mysql.connection.commit()
        return jsonify({'success': True })
    except Exception as e:
        app.logger.info("Error in insertion of Customer.")
        return jsonify({'success': False })
    return jsonify({'success': False })

# endpoint to show all clients
@app.route("/client", methods=["GET"])
@cross_origin()
def get_client():
	cur = mysql.connection.cursor()
	cur.execute("SELECT `customers`.`cid`, `customers`.`name`, `customers`.`city`, `customers`.`csat`, MAX(`feedbacks`.`created_at`) as 'lp' FROM `feedbacks` RIGHT OUTER JOIN `customers` ON `customers`.`cid` <=> `feedbacks`.`cid` GROUP BY `customers`.`cid`")
	row_headers=[x[0] for x in cur.description] #this will extract row headers
	rv = cur.fetchall()
	json_data=[]
	for result in rv:
			json_data.append(dict(zip(row_headers,result)))
	return jsonify(json_data)


# endpoint to get client detail by id
@app.route("/client/<id>", methods=["GET"])
@cross_origin()
def client_detail(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT `customers`.`cid`, `customers`.`name`, `customers`.`csat`, `customers`.`city`, `customers`.`state`, `customers`.`phone`, `customers`.`email`, `customers`.`image` FROM `customers` WHERE `customers`.`cid` = "+str(id))
    row_headers1=[x[0] for x in cur.description] #this will extract row headers
    basic = cur.fetchone()
    
    cur.execute("SELECT COUNT(*) AS cnt, SUM(products.price) AS revenue FROM `feedbacks` JOIN `products` ON `products`.`pid` = `feedbacks`.`pid` WHERE `feedbacks`.`cid` = "+str(id)+" AND `feedbacks`.`created_at` >= DATE_SUB(NOW(),INTERVAL 1 YEAR)")
    pa = cur.fetchone()
    app.logger.info(pa)
    cur.execute("SELECT DATE_FORMAT(date, '%b-%y') AS Month, COUNT(`feedbacks`.`fid`) AS 'Total Purchase' FROM ( SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 1 MONTH AS date UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 2 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 3 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 4 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 5 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 6 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 7 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 8 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 9 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 10 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 11 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 12 MONTH ) AS dates LEFT JOIN ( SELECT * FROM `feedbacks` WHERE `feedbacks`.`cid` = "+str(id)+") AS feedbacks ON `feedbacks`.`created_at` >= date AND `feedbacks`.`created_at` < date + INTERVAL 1 MONTH GROUP BY date ORDER BY date")
    pc = cur.fetchall()
    pcArray=[]
    if pc is not None:
        row_headers2=[x[0] for x in cur.description]
        for result in pc:
            pcArray.append(dict(zip(row_headers2,result)))

    cur.execute("SELECT DATE_FORMAT(date, '%b-%y') AS Month, AVG(`feedbacks`.`csat`) AS 'CSAT' FROM ( SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 1 MONTH AS date UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 2 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 3 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 4 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 5 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 6 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 7 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 8 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 9 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 10 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 11 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 12 MONTH ) AS dates LEFT JOIN ( SELECT * FROM `feedbacks` WHERE `feedbacks`.`cid` = "+str(id)+") AS feedbacks ON `feedbacks`.`created_at` >= date AND `feedbacks`.`created_at` < date + INTERVAL 1 MONTH GROUP BY date ORDER BY date")
    cs = cur.fetchall()
    csArray=[]
    if cs is not None:
        row_headers3=[x[0] for x in cur.description]
        for result in cs:
            csArray.append(dict(zip(row_headers3,result)))
    
    cur.execute("SELECT `products`.`image`, `products`.`name`, `feedbacks`.`csat`, DATE_FORMAT(`feedbacks`.`created_at`, '%d %b %Y') as 'created_at' FROM `feedbacks` INNER JOIN `products` ON `products`.`pid` = `feedbacks`.`pid` WHERE `feedbacks`.`cid` = "+str(id)+"  LIMIT 3")
    fh = cur.fetchall()
    fhArray=[]
    if fh is not None:
        row_headers4=[x[0] for x in cur.description]
        for result in fh:
            fhArray.append(dict(zip(row_headers4,result)))

    cur.execute("SELECT A.name AS name1, B.name AS name2, C.name AS name3, D.name AS name4 FROM `recommendation` JOIN `products` AS A on A.pid = `recommendation`.`item1` JOIN `products` AS B on B.pid = `recommendation`.`item1` JOIN `products` AS C on C.pid = `recommendation`.`item1` JOIN `products` AS D on D.pid = `recommendation`.`item1` WHERE `recommendation`.`cid` = "+str(id))
    rcname = cur.fetchone()
    cur.execute("SELECT `recommendation`.`item1`,`recommendation`.`item2`,`recommendation`.`item3`,`recommendation`.`item4` FROM `recommendation` JOIN `products` AS A on A.pid = `recommendation`.`item1` JOIN `products` AS B on B.pid = `recommendation`.`item1` JOIN `products` AS C on C.pid = `recommendation`.`item1` JOIN `products` AS D on D.pid = `recommendation`.`item1` WHERE `recommendation`.`cid` = "+str(id))
    rclink = cur.fetchone()
    rc = []
    if rclink is not None:
        rc = list(zip(rclink, rcname))

    pi=[0,0,0,0,0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>4 AND `feedbacks`.`cid` = "+str(id))
    pi[0] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>3 AND `feedbacks`.`csat`<=4 AND `feedbacks`.`cid` = "+str(id))
    pi[1] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>2 AND `feedbacks`.`csat`<=3 AND `feedbacks`.`cid` = "+str(id))
    pi[2] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>1 AND `feedbacks`.`csat`<=2 AND `feedbacks`.`cid` = "+str(id))
    pi[3] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>0 AND `feedbacks`.`csat`<=1 AND `feedbacks`.`cid` = "+str(id))
    pi[4] = cur.fetchone()[0]

    json_data={"basic":dict(zip(row_headers1,basic)), "purchaseCount": pa[0], "totalRevenue": pa[1], "purchaseActivityChartData": pcArray, "csatHistoryChartData": csArray, "feedbackHistory": fhArray, "recommendations": rc, "overall_csat": pi}
    return jsonify(json_data)


# endpoint to update client
@app.route("/client/<id>", methods=["PUT"])
def client_update(id):
    return False


# endpoint to delete client
@app.route("/client/<id>", methods=["DELETE"])
def client_delete(id):
    return False

#####################
# PRODUCT ENDPOINTS #
#####################

# endpoint to create new product
@app.route("/client", methods=["POST"])
def add_product():
    try:
        name = request.json['name']
        image = request.json['image']
        phone = request.json['phone']
        email = request.json['email']
        addr1 = request.json['addr1']
        addr2 = request.json['addr2']
        city = request.json['city']
        state = request.json['state']
        pin = request.json['pin']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO `customers` (`cid`, `name`, `csat`, `address1`, `address2`, `city`, `state`, `country`, `pin`, `phone`, `email`, `image`, `created_at`, `modified_at`) VALUES (NULL, '"+str(name)+"', '2.5', '"+str(addr1)+"', '"+str(addr2)+"', '"+str(city)+"', '"+str(state)+"', 'India', '"+str(pin)+"', '"+str(phone)+"', '"+str(email)+"', '"+str(image)+"', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)")
        app.logger.info("Inserted 1 Customer")
        mysql.connection.commit()
        return jsonify({'success': True })
    except Exception as e:
        app.logger.info("Error in insertion of Customer.")
        return jsonify({'success': False })
    return jsonify({'success': False })


# endpoint to show all products
@app.route("/product", methods=["GET"])
@cross_origin()
def get_product():
	cur = mysql.connection.cursor()
	cur.execute("SELECT `products`.`pid`, `products`.`image` , `products`.`name`, `products`.`price`, `products`.`csat` FROM `products`")
	row_headers=[x[0] for x in cur.description] #this will extract row headers
	rv = cur.fetchall()
	json_data=[]
	for result in rv:
			json_data.append(dict(zip(row_headers,result)))
	return jsonify(json_data)


# endpoint to get product detail by id
@app.route("/product/<id>", methods=["GET"])
@cross_origin()
def product_detail(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT `customers`.`cid`, `customers`.`name`, `customers`.`csat`, `customers`.`city`, `customers`.`state`, `customers`.`phone`, `customers`.`email`, `customers`.`image` FROM `customers` WHERE `customers`.`cid` = "+str(id))
    row_headers1=[x[0] for x in cur.description] #this will extract row headers
    basic = cur.fetchone()
    
    cur.execute("SELECT COUNT(*) AS cnt, SUM(products.price) AS revenue FROM `feedbacks` JOIN `products` ON `products`.`pid` = `feedbacks`.`pid` WHERE `feedbacks`.`cid` = "+str(id)+" AND `feedbacks`.`created_at` >= DATE_SUB(NOW(),INTERVAL 1 YEAR)")
    pa = cur.fetchone()
    app.logger.info(pa)
    cur.execute("SELECT DATE_FORMAT(date, '%b-%y') AS Month, COUNT(`feedbacks`.`fid`) AS 'Total Purchase' FROM ( SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 1 MONTH AS date UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 2 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 3 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 4 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 5 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 6 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 7 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 8 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 9 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 10 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 11 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 12 MONTH ) AS dates LEFT JOIN ( SELECT * FROM `feedbacks` WHERE `feedbacks`.`cid` = "+str(id)+") AS feedbacks ON `feedbacks`.`created_at` >= date AND `feedbacks`.`created_at` < date + INTERVAL 1 MONTH GROUP BY date ORDER BY date")
    pc = cur.fetchall()
    pcArray=[]
    if pc is not None:
        row_headers2=[x[0] for x in cur.description]
        for result in pc:
            pcArray.append(dict(zip(row_headers2,result)))

    cur.execute("SELECT DATE_FORMAT(date, '%b-%y') AS Month, AVG(`feedbacks`.`csat`) AS 'CSAT' FROM ( SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 1 MONTH AS date UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 2 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 3 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 4 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 5 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 6 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 7 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 8 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 9 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 10 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 11 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 12 MONTH ) AS dates LEFT JOIN ( SELECT * FROM `feedbacks` WHERE `feedbacks`.`cid` = "+str(id)+") AS feedbacks ON `feedbacks`.`created_at` >= date AND `feedbacks`.`created_at` < date + INTERVAL 1 MONTH GROUP BY date ORDER BY date")
    cs = cur.fetchall()
    csArray=[]
    if cs is not None:
        row_headers3=[x[0] for x in cur.description]
        for result in cs:
            csArray.append(dict(zip(row_headers3,result)))
    
    cur.execute("SELECT `products`.`image`, `products`.`name`, `feedbacks`.`csat`, DATE_FORMAT(`feedbacks`.`created_at`, '%d %b %Y') as 'created_at' FROM `feedbacks` INNER JOIN `products` ON `products`.`pid` = `feedbacks`.`pid` WHERE `feedbacks`.`cid` = "+str(id)+"  LIMIT 3")
    fh = cur.fetchall()
    fhArray=[]
    if fh is not None:
        row_headers4=[x[0] for x in cur.description]
        for result in fh:
            fhArray.append(dict(zip(row_headers4,result)))

    cur.execute("SELECT A.name AS name1, B.name AS name2, C.name AS name3, D.name AS name4 FROM `recommendation` JOIN `products` AS A on A.pid = `recommendation`.`item1` JOIN `products` AS B on B.pid = `recommendation`.`item1` JOIN `products` AS C on C.pid = `recommendation`.`item1` JOIN `products` AS D on D.pid = `recommendation`.`item1` WHERE `recommendation`.`cid` = "+str(id))
    rcname = cur.fetchone()
    cur.execute("SELECT `recommendation`.`item1`,`recommendation`.`item2`,`recommendation`.`item3`,`recommendation`.`item4` FROM `recommendation` JOIN `products` AS A on A.pid = `recommendation`.`item1` JOIN `products` AS B on B.pid = `recommendation`.`item1` JOIN `products` AS C on C.pid = `recommendation`.`item1` JOIN `products` AS D on D.pid = `recommendation`.`item1` WHERE `recommendation`.`cid` = "+str(id))
    rclink = cur.fetchone()
    rc = []
    if rclink is not None:
        rc = list(zip(rclink, rcname))

    pi=[0,0,0,0,0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>4 AND `feedbacks`.`cid` = "+str(id))
    pi[0] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>3 AND `feedbacks`.`csat`<=4 AND `feedbacks`.`cid` = "+str(id))
    pi[1] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>2 AND `feedbacks`.`csat`<=3 AND `feedbacks`.`cid` = "+str(id))
    pi[2] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>1 AND `feedbacks`.`csat`<=2 AND `feedbacks`.`cid` = "+str(id))
    pi[3] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>0 AND `feedbacks`.`csat`<=1 AND `feedbacks`.`cid` = "+str(id))
    pi[4] = cur.fetchone()[0]

    json_data={"basic":dict(zip(row_headers1,basic)), "purchaseCount": pa[0], "totalRevenue": pa[1], "purchaseActivityChartData": pcArray, "csatHistoryChartData": csArray, "feedbackHistory": fhArray, "recommendations": rc, "overall_csat": pi}
    return jsonify(json_data)


# endpoint to update product
@app.route("/product/<id>", methods=["PUT"])
def product_update(id):
    return False


# endpoint to delete product
@app.route("/product/<id>", methods=["DELETE"])
def product_delete(id):
    return False

######################
# FEEDBACK ENDPOINTS #
######################

# endpoint to create new product
@app.route("/feedback", methods=["POST"])
def add_feedback():
    try:
        name = request.json['name']
        image = request.json['image']
        phone = request.json['phone']
        email = request.json['email']
        addr1 = request.json['addr1']
        addr2 = request.json['addr2']
        city = request.json['city']
        state = request.json['state']
        pin = request.json['pin']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO `customers` (`cid`, `name`, `csat`, `address1`, `address2`, `city`, `state`, `country`, `pin`, `phone`, `email`, `image`, `created_at`, `modified_at`) VALUES (NULL, '"+str(name)+"', '2.5', '"+str(addr1)+"', '"+str(addr2)+"', '"+str(city)+"', '"+str(state)+"', 'India', '"+str(pin)+"', '"+str(phone)+"', '"+str(email)+"', '"+str(image)+"', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)")
        app.logger.info("Inserted 1 Customer")
        mysql.connection.commit()
        return jsonify({'success': True })
    except Exception as e:
        app.logger.info("Error in insertion of Customer.")
        return jsonify({'success': False })
    return jsonify({'success': False })


# endpoint to show all feedbacks
@app.route("/feedback", methods=["GET"])
@cross_origin()
def get_feedback():
	cur = mysql.connection.cursor()
	cur.execute("SELECT `feedbacks`.`fid`, `feedbacks`.`cid`, `feedbacks`.`pid`, `customers`.`name` AS cname, `products`.`name` AS pname, `feedbacks`.`csat`, `feedbacks`.`created_at` FROM `feedbacks` JOIN `customers` ON `customers`.`cid` = `feedbacks`.`cid` JOIN `products` ON `products`.`pid` = `feedbacks`.`pid` ORDER BY `feedbacks`.`created_at` DESC")
	row_headers=[x[0] for x in cur.description] #this will extract row headers
	rv = cur.fetchall()
	json_data=[]
	for result in rv:
			json_data.append(dict(zip(row_headers,result)))
	return jsonify(json_data)


# endpoint to get feedback detail by id
@app.route("/feedback/<id>", methods=["GET"])
@cross_origin()
def feedback_detail(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT `customers`.`cid`, `customers`.`name`, `customers`.`csat`, `customers`.`city`, `customers`.`state`, `customers`.`phone`, `customers`.`email`, `customers`.`image` FROM `customers` WHERE `customers`.`cid` = "+str(id))
    row_headers1=[x[0] for x in cur.description] #this will extract row headers
    basic = cur.fetchone()
    
    cur.execute("SELECT COUNT(*) AS cnt, SUM(products.price) AS revenue FROM `feedbacks` JOIN `products` ON `products`.`pid` = `feedbacks`.`pid` WHERE `feedbacks`.`cid` = "+str(id)+" AND `feedbacks`.`created_at` >= DATE_SUB(NOW(),INTERVAL 1 YEAR)")
    pa = cur.fetchone()
    app.logger.info(pa)
    cur.execute("SELECT DATE_FORMAT(date, '%b-%y') AS Month, COUNT(`feedbacks`.`fid`) AS 'Total Purchase' FROM ( SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 1 MONTH AS date UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 2 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 3 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 4 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 5 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 6 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 7 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 8 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 9 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 10 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 11 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 12 MONTH ) AS dates LEFT JOIN ( SELECT * FROM `feedbacks` WHERE `feedbacks`.`cid` = "+str(id)+") AS feedbacks ON `feedbacks`.`created_at` >= date AND `feedbacks`.`created_at` < date + INTERVAL 1 MONTH GROUP BY date ORDER BY date")
    pc = cur.fetchall()
    pcArray=[]
    if pc is not None:
        row_headers2=[x[0] for x in cur.description]
        for result in pc:
            pcArray.append(dict(zip(row_headers2,result)))

    cur.execute("SELECT DATE_FORMAT(date, '%b-%y') AS Month, AVG(`feedbacks`.`csat`) AS 'CSAT' FROM ( SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 1 MONTH AS date UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 2 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 3 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 4 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 5 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 6 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 7 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 8 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 9 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 10 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 11 MONTH UNION ALL SELECT LAST_DAY(CURRENT_DATE) + INTERVAL 1 DAY - INTERVAL 12 MONTH ) AS dates LEFT JOIN ( SELECT * FROM `feedbacks` WHERE `feedbacks`.`cid` = "+str(id)+") AS feedbacks ON `feedbacks`.`created_at` >= date AND `feedbacks`.`created_at` < date + INTERVAL 1 MONTH GROUP BY date ORDER BY date")
    cs = cur.fetchall()
    csArray=[]
    if cs is not None:
        row_headers3=[x[0] for x in cur.description]
        for result in cs:
            csArray.append(dict(zip(row_headers3,result)))
    
    cur.execute("SELECT `products`.`image`, `products`.`name`, `feedbacks`.`csat`, DATE_FORMAT(`feedbacks`.`created_at`, '%d %b %Y') as 'created_at' FROM `feedbacks` INNER JOIN `products` ON `products`.`pid` = `feedbacks`.`pid` WHERE `feedbacks`.`cid` = "+str(id)+"  LIMIT 3")
    fh = cur.fetchall()
    fhArray=[]
    if fh is not None:
        row_headers4=[x[0] for x in cur.description]
        for result in fh:
            fhArray.append(dict(zip(row_headers4,result)))

    cur.execute("SELECT A.name AS name1, B.name AS name2, C.name AS name3, D.name AS name4 FROM `recommendation` JOIN `products` AS A on A.pid = `recommendation`.`item1` JOIN `products` AS B on B.pid = `recommendation`.`item1` JOIN `products` AS C on C.pid = `recommendation`.`item1` JOIN `products` AS D on D.pid = `recommendation`.`item1` WHERE `recommendation`.`cid` = "+str(id))
    rcname = cur.fetchone()
    cur.execute("SELECT `recommendation`.`item1`,`recommendation`.`item2`,`recommendation`.`item3`,`recommendation`.`item4` FROM `recommendation` JOIN `products` AS A on A.pid = `recommendation`.`item1` JOIN `products` AS B on B.pid = `recommendation`.`item1` JOIN `products` AS C on C.pid = `recommendation`.`item1` JOIN `products` AS D on D.pid = `recommendation`.`item1` WHERE `recommendation`.`cid` = "+str(id))
    rclink = cur.fetchone()
    rc = []
    if rclink is not None:
        rc = list(zip(rclink, rcname))

    pi=[0,0,0,0,0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>4 AND `feedbacks`.`cid` = "+str(id))
    pi[0] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>3 AND `feedbacks`.`csat`<=4 AND `feedbacks`.`cid` = "+str(id))
    pi[1] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>2 AND `feedbacks`.`csat`<=3 AND `feedbacks`.`cid` = "+str(id))
    pi[2] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>1 AND `feedbacks`.`csat`<=2 AND `feedbacks`.`cid` = "+str(id))
    pi[3] = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM `feedbacks` WHERE `feedbacks`.`csat`>0 AND `feedbacks`.`csat`<=1 AND `feedbacks`.`cid` = "+str(id))
    pi[4] = cur.fetchone()[0]

    json_data={"basic":dict(zip(row_headers1,basic)), "purchaseCount": pa[0], "totalRevenue": pa[1], "purchaseActivityChartData": pcArray, "csatHistoryChartData": csArray, "feedbackHistory": fhArray, "recommendations": rc, "overall_csat": pi}
    return jsonify(json_data)


# endpoint to update feedback
@app.route("/feedback/<id>", methods=["PUT"])
def feedback_update(id):
    return False


# endpoint to delete feedback
@app.route("/feedback/<id>", methods=["DELETE"])
def feedback_delete(id):
    return False


if __name__ == "__main__": 
	app.run(host ="localhost", port = int("5000"), debug=True) 


#SELECT month(`created_at`), COUNT(*) AS electricity FROM `feedbacks` GROUP BY month(`created_at`)