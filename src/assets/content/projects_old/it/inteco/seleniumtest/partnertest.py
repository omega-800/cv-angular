import time, csv, requests
from requests.exceptions import ConnectTimeout, ConnectionError
from urllib3.exceptions import MaxRetryError, ConnectTimeoutError, NewConnectionError
from socket import gaierror
from selenium import webdriver
from selenium.webdriver.common.by import By

# assign firefox as webdriver
driver = webdriver.Firefox()

# array will be filled with testresults [[countries], [regions], [partners]]
check = [[],[],[]]

# for testing
# limit_iterations = 50
# iterations_run = 0

# objects for saving test results with default values assigned
class Region:
    kind = 'region'
    image = 'object'
    has_logo = 'True'
    has_desc = 'True'
    has_img = 'True'

class Country:
    kind = 'country'
    image = 'object'
    has_logo = 'True'
    has_desc = 'True'
    has_img = 'True'

class Partner:
    kind = 'partner'
    image = 'img'
    has_logo = 'True'
    has_desc = 'True'
    has_img = 'True'
    has_items = 'True'
    has_filter = 'False'
    filter_works = 'False'
    has_link = 'False'
    link_works = 'False'

# writes a new row to the html file 
def write_row(file, row, items, is_header):
    if is_header:
        file.write('<thead>\n<tr>\n<th>'+str(row)+'</th>\n')
        for item in items:
            file.write('<th>'+item+'</th>\n')
        file.write('</tr>\n</thead>\n')
    else:
        file.write('<tr>\n<td class="bold">'+str(row)+'</td>\n')
        for item in items:
            if item == 'True':
                file.write('<td class="true">'+item+'</td>\n')
            elif item == 'False':
                file.write('<td class="false">'+item+'</td>\n')
            else:
                file.write('<td>'+item+'</td>')
        file.write('</tr>\n')

# method for checking if the box with the logo (teaser) is being displayed correctly
def check_teaser(position, object):
    # get array or all teasers on page
    items = driver.find_elements(By.CSS_SELECTOR, '.content-card-layout > .img')

    # if the teaser box to check has a nested div for image or svg
    if len(items[position].find_elements(By.CSS_SELECTOR, 'div > *')) != 0:
        # get said img or object
        img = items[position].find_element(By.CSS_SELECTOR, 'div > '+object.image)
        # if image is not being displayed assign has_logo=False to the item being checked
        if img.get_attribute("naturalWidth") == "0" or img.get_attribute("naturalWidth") == "undefined":
            object.has_logo = 'False'
    else:
        object.has_logo = 'False'

    # click on said item for further checking of the details page
    items[position].click()

# checks if the details page of an item is being displayed correctly
def check_page(object, name):
    object.name = name

    if len(driver.find_elements(By.CSS_SELECTOR, '.partner-text > .text-layout > span')) == 0:
        object.has_desc = 'False'

    if len(driver.find_elements(By.CSS_SELECTOR, '.partner-img > '+object.image)) == 0:
        object.has_img = 'False'

    # if the item is a partner, then also check if their link and filter work
    if object.kind == 'partner':
        link_website = driver.find_elements(By.CSS_SELECTOR, '.partner-website > div > a')
        link_filter = driver.find_elements(By.CSS_SELECTOR, '.partner-button > span > a')

        # checks if there is a productList 
        if len(driver.find_elements(By.CSS_SELECTOR, '.shop-item-area > *')) == 0:
            object.has_items = 'False'
            
        if len(link_website) != 0:
            object.has_link = 'True'
            try:
                response = requests.get(link_website[0].get_attribute("href"))
                if response.ok: object.link_works = 'True'
            except requests.exceptions.HTTPError as err:
                print(err)
            except ConnectTimeout as err:
                print(err)
            except ConnectionError as err:
                print(err)
            except TimeoutError as err:
                print(err)
            except MaxRetryError as err:
                print(err)
            except NewConnectionError as err:
                print(err)
            except ConnectTimeoutError as err:
                print(err)
            except gaierror as err:
                print(err)

        if len(link_filter) != 0:
            object.has_filter = 'True'
            # goes to /shop/alle-produkte/produzent/[item]
            link_filter[0].click()
            time.sleep(1)
            active_filter = driver.find_elements(By.CSS_SELECTOR, 'section > .col-d-12 > .sat-filters > *')

            if len(active_filter) != 0:
                object.filter_works = 'True'
        
# open new window, redirect browser to firstwinenew, login    
driver.get(r"http://localhost:8080/firstwinenew-awards-webapp/.magnolia/pages/adminCentral.html")
driver.find_element(By.ID, 'username').send_keys("superuser")
driver.find_element(By.ID,'mgnlUserPSWD').send_keys("SchorschGaggo-98")
driver.find_element(By.ID,'submitButton').submit()
time.sleep(1)

driver.get(r"http://localhost:8080/firstwinenew-awards-webapp/partner")
driver.maximize_window()
# click the "Vorschau" button
driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div/button[1]").click() 

# save url to go back to, get all teaser boxes of countries
url_country = driver.current_url
countries = driver.find_elements(By.CSS_SELECTOR, '.content-card-layout > .img')

# cycle through country teaser boxes displayed on page
for country_position in range(0, len(countries)):
    # for testing
    # iterations_run += 1
    # if iterations_run > limit_iterations: break

    country = Country()
    check_teaser(country_position, country)
    country_name = driver.find_element(By.TAG_NAME, 'h1').get_attribute('innerHTML')
    check_page(country, country_name)
    check[0].append(country)

    # save url to go back to, get all teaser boxes of regions
    url_region = driver.current_url
    regions = driver.find_elements(By.CSS_SELECTOR, '.content-card-layout > .img')

    # cycle through region teaser boxes displayed on page
    for region_position in range(0, len(regions)):
        # for testing
        # iterations_run += 1
        # if iterations_run > limit_iterations: break

        region = Region()
        check_teaser(region_position, region)
        region_name = country_name+"/"+driver.find_element(By.TAG_NAME, 'h1').get_attribute('innerHTML')
        check_page(region, region_name)
        check[1].append(region)

        # save url to go back to, get all teaser boxes of partners
        url_partner = driver.current_url
        partners = driver.find_elements(By.CSS_SELECTOR, '.content-card-layout > .img')

        # cycle through partner teaser boxes displayed on page
        for partner_position in range(0, len(partners)):
            # for testing
            # iterations_run += 1
            # if iterations_run > limit_iterations: break

            partner = Partner()
            check_teaser(partner_position, partner)
            partner_name = region_name+"/"+driver.find_element(By.TAG_NAME, 'h1').get_attribute('innerHTML')
            check_page(partner, partner_name)
            check[2].append(partner)

            driver.get(url_partner)

        driver.get(url_region)

    driver.get(url_country)

# write results to csv file
with open('partnertest.csv', 'w', encoding='UTF8', newline='') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(['Object', 'Name', 'Has Logo', 'Has Description', 'Has Image', 'Has Products', 'Has Filter', 'Filter Works', 'Has Website', 'Website Works'])
    for items in check:
        for item in items:
            if item.kind == 'partner':
                writer.writerow([item.kind, item.name, item.has_logo, item.has_desc, item.has_img, item.has_items, item.has_filter, item.filter_works, item.has_link, item.link_works])
            else:
                writer.writerow([item.kind, item.name, item.has_logo, item.has_desc, item.has_img])

# and an html table 
with open('partnertest.html', 'w', encoding='UTF8') as html_file:
    row = 0
    # write opening html structure
    html_file.write('<!DOCTYPE html>\n<html>\n')
    # write css
    html_file.write('<head>\n<style>\n.true{color: green; border: 1px solid green;}\n.false{color: red; border: 1px solid red;}\ntd,th{color: black; border: 1px solid black;}\nth{position:sticky; top:0; background-color:white;}\n</style>\n</head>\n')
    html_file.write('<body>\n<table style:"border: 1px solid black;">\n')
    # write table header
    write_row(html_file, "Nr", ['Object', 'Name', 'Has Logo', 'Has Description', 'Has Image', 'Has Products', 'Has Filter', 'Filter Works', 'Has Website', 'Website Works'], True)
    
    # write each row into table body
    html_file.write('<tbody>\n')
    for items in check:
        for item in items:
            row += 1
            if item.kind == 'partner':
                write_row(html_file, row, [item.kind, item.name, item.has_logo, item.has_desc, item.has_img, item.has_items, item.has_filter, item.filter_works, item.has_link, item.link_works], False)
            else:
                write_row(html_file, row, [item.kind, item.name, item.has_logo, item.has_desc, item.has_img, "-", "-", "-", "-", "-"], False)
    # write closing html structure
    html_file.write('</tbody>\n</table>\n</body>\n</html>')




