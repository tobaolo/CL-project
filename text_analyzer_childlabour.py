import sys
import re
from textblob import TextBlob
import csv

doc = sys.argv[1]
f = open(doc, "r")
text = f.read()

def numChars(text):
    res = re.findall(r'\w+', text) 
    char_cnt = 0
    for word in res:
        char_cnt += len(word)
    return char_cnt

def numWords(text):
    res = re.findall(r'\w+', text) 
    return len(res)

def numSent(text):
    sent = re.split(r' *[\.\?!][\'"\)\]]* *', text)
    if ('' in sent):
        sent.remove('')
    return len(sent)

def calcAvgWrdLen(text):
    word_list =  re.findall(r'\w+', text) 
    sum = 0.0
    for word in word_list:
        sum += len(word)
    return (sum/float(len(word_list)))

def calcAvgSentLen(text):
    sent = re.split(r' *[\.\?!][\'"\)\]]* *', text)
    if ('' in sent):
        sent.remove('')
    sum = 0.0
    for sentence in sent:
        sum += numWords(sentence)
    return (sum/len(sent))

def colemanLiau(text):
    words = numWords(text)
    chars = numChars(text)
    sents = numSent(text)
    return (
        (0.0588 * (chars * 100.0 / words))
        - (0.296 * (sents * 100.0) / words)
        - 15.8
    )

sentiment = TextBlob(text)

print("-------------------")
print("File Name: %s" %doc)
print("Sentiment Score from -1 to 1: %f" %sentiment.sentiment.polarity)
print("Objectivity(0) vs Subjectivity(1) Score from 0 to 1: %f" %sentiment.sentiment.subjectivity)
print("Number of Chars: %i chars" %numChars(text))
print("Number of Words: %i words" %numWords(text))
print("Number of Sent: %i sentences" %numSent(text))
print("Average word length: %f chars" %calcAvgWrdLen(text))
print("Average Sentence length: %f words" %calcAvgSentLen(text))
print("Reading Level: %f" %colemanLiau(text))
print("-------------------")

with open('articleData.csv', 'a', newline='') as articleData:
    writer = csv.writer(articleData)
    writer.writerow([])
    writer.writerow([doc, sentiment.sentiment.polarity, sentiment.sentiment.subjectivity, numChars(text), numWords(text), numSent(text), calcAvgWrdLen(text), calcAvgSentLen(text), colemanLiau(text)])
    print('done')