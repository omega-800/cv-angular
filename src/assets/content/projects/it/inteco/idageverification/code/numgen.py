#import random
import re

verification = [7,3,1]

def verifyNumber(nr, tocheck):
    result = 0
    y=0
    for i in str(nr):
        result += int(i)*verification[int(y)%3]
        y+=1
    return abs(result) % 10 == tocheck

def getVerifyNumber(nr):
    result = 0
    y=0
    for i in str(nr):
        result += int(i)*verification[int(y)%3]
        y+=1
    return abs(result) % 10


#date = 200101
date = input("date: ")
verdate = getVerifyNumber(date)

idNr = "12345678"
verId = getVerifyNumber(idNr)

validNr = input("valid: ")
verValid = getVerifyNumber(validNr)

completeNr = str(idNr)+"0"+str(verId)+str(date)+str(verdate)+str(validNr)+str(verValid)
verComplete = getVerifyNumber(int(completeNr))

idFirst = int(re.search(r'\d', str(idNr)).group())
idLetter = "ABCDEFGHIJ"[idFirst]

#print(verifyNumber(date, verdate))
#print(verifyNumber(idNr, verId))
#print(verifyNumber(validNr, verValid))
#print(verifyNumber(completeNr, verComplete))

print(idLetter+str(idNr)[1:])
print(verId)
print(str(date)+str(verdate))
print(str(validNr)+str(verValid))
print(verComplete)
print(completeNr)