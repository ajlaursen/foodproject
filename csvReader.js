fetch('./media/foodResources.csv')
    .then(response => response.text())
    .then(data => {
        // Split the lines
        const CSVToArray = strData => {
            let [headers, ...table] = strData.split('\n').map(r => r.split(','));
            return table.map(row => headers.reduce((acc, val, i) => ({ ...acc, [val.trim()]: row[i].trim() }), {}));
        };
        let parsedCSV = CSVToArray(data);
  
        parsedCSV.forEach(item => {
            let li = document.createElement('li');
            let textNode1 = document.createTextNode(`${item['Name']} in ${item['City']} provides services at ${item['Address']}: ${item['Description of Services']} – contact details: `);
            
            let a = document.createElement('a');
            a.href = item['Website Link'];
            a.textContent = item['Website Link'];
            
            let textNode2 = document.createTextNode(`, ${item['Phone Number']}`);
            
            li.appendChild(textNode1);
            li.appendChild(a);
            li.appendChild(textNode2);
            
            document.querySelector('#csv-list').appendChild(li);
        });
    })
    .catch((error) => {
        console.error(`Error: ${error}`);
    });