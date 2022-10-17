## Description

A backend server built with Express.js, Postgresql and Rest API. This server calculates how much money spent on Bezos-related companies and return the transaction information with it.

## Install

1. Clone the repository
```
$ git clone https://github.com/photoday0914/ESW.git
$ cd ESW
$ npm install
```
2. Install Postgresql
- https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

## Setup

```
 Create .env file that include:
 
	PORT =
	
	NODE_ENV =
	
	USER =
	
	HOST =
	
	PASSWORD =
	
	DATABASE =
	
	DIALECT =
	
	DB_PORT = 
	
	DATA_URL =

```

## Start development

```
$ npm run dev
```
- These requests should be executed in order at first.
	1.  https://{HOST:PORT}//init
	2.  https://{HOST:PORT}//transactions

## Languages & tools

- Node.js 
- Express.js
- Postgresql 
- Typescript

## REST API Reference

- /init
	- method: get
	- Initialize database with Bezos related companies
- /transactions
	- method: get
	- load transactions with calculated results(total, his spend and percentage of his spend)

- /mark
	- method: post
	- body: [name : value]
		- parameter
			- name: company name (string type)
	- description
		- mark the company as Bezos related and return the response with updated transactions and calculated results
- /unmark
	- method: post
	- body:  [name : value]
		- parameter
			- name: company name (string type)
	- description
		- unmark the Bezos related company and return the response with updated transactions and calculated results