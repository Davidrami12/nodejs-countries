import * as fs from 'fs';

interface CountryInterface {
    name: string;
    population: number;
    area: number;
    density: number;
}

const processFile = (): CountryInterface[] => {
    const readCountries = fs.readFileSync('countries.txt', 'utf8');
    const countryLine: string[] = readCountries.split('\n').slice(1);  // split string into array, and skip first line
    const countryData: CountryInterface[] = [];

    for (let line of countryLine) {
        const words: string[] = line.split(' '); // split line into array or words

        const name: string = words.slice(0, -2).join(' ');
        const population: number = Number(words[words.length - 2].replace(/,/g, ''));
        const area: number = Number(words[words.length - 1].replace(/,/g, ''));
        const density: number = Number((population / area).toFixed(2));

        countryData.push({ name, population, area, density });
        
    }

    return countryData.sort((a, b) => b.density - a.density);
}

const writeCsv = (countryData: CountryInterface[]) => {
    
    let csvData: string[] = countryData.map(country => 
        `COUNTRY: ${country.name}, POPULATION: ${country.population}, AREA: ${country.area}, DENSITY: ${country.density}`
    );

    fs.writeFileSync('countries.csv', csvData.join('\n'));
}

const data = processFile();
writeCsv(data);