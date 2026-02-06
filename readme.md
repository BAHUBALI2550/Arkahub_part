# EnergyGrid Data Aggregator (Client)

## Overview
This project is a Node.js client that aggregates telemetry data from 500 solar inverters using a legacy EnergyGrid API with strict rate limits and security requirements.

## Key Constraints Handled
- 1 request per second (strict)
- Max 10 devices per request
- MD5-based request signing
- Graceful retries on 429 errors

## Approach
- Serial numbers are batched into groups of 10
- Requests are executed sequentially through a simple rate limiter
- Each request is signed using the required MD5 format
- Failed requests are retried up to 3 times

## How to Run

### 1. Start the Mock API
```bash
cd mock-api
npm install
npm start
