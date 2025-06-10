# Amiibo API Exploration App

This app utilizes the free educational Amiibo API https://www.amiiboapi.com/ in a simple Next.js & MaterialUI app.


## Core Features
This app demonstrates the following features:
- Controlled Forms: For sorting the amiibo table and searching.
- Mapping objects to tables with sort() and filter(): For taking the amiibo api data and generating a table on the fly, and sorting to the form selections.
- Data persistence: In memory caching is used to store selected amiibo in a private collection. 
- External API: The amiibo API itself is used.

## Technical Features
This app also uses the following basic technical features:
- Custom types for API data
- General encapsulation of separate UI components
- State managed using providers and useMemo, useEffect, useState
- App router API route for retrieving data from the amiibo API
- MUI for all UI and styling
- Next.js and Typescript

## Deployment
The app has been deployed to https://cs-494-final.vercel.app/