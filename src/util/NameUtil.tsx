export class NameUtil {

  /**
   * Gets the display name for a pretty-printed gender.
   * @param gender the gender string straight from the API call.
   * @returns a pretty-print ready gender.
   */
  static getGenderFull(gender: string) {
    switch (gender) {
      case "M":
        return "Male";  
      case "1M":
        return "Male if first part of name, otherwise mostly female"
      case "?M":
        return "Mostly male";
      case "F":
        return "Female";
      case "1F":
        return "Female if first part of name, otherwise mostly male"
      case "?F":
        return "Mostly female";
      case "?":
        return "Unisex";
    }
    return "Unknown";
  }

  /**
   * Formats an array of countries for the API call.
   * @param countries the input array of countries.
   * @returns the formatted segment of the URL.
   */
  static getCountriesFormatted(countries: string[]) {
    var formattedCountries = "";
    countries.forEach((country) => {
      formattedCountries += "&" + country + "=true";
    });
    return formattedCountries;
  }

  /**
   * Pretty-printed label for displaying a country.
   * @param country the input country from data.
   * @returns formatted Country name.
   */
  static getCountryLabel(country: string) {
    switch(country) {
      case "Swiss":
        return "Switzerland";
      case "Turkey":
        return "Türkiye";
      case "East Frisia":
        return "East Frisia (NW Germany)";
      case "the Netherlands":
        return "The Netherlands";
      case "Great Britain":
        return "The United Kingdom";
      case "Kazakhstan/Uzbekistan,etc.":
        return "Kazakhstan / Uzbekistan";
    }
    return country;
  }

  static getCountryAbbr(country: string) {
    switch(country) {
      case "Albania":
        return "ALB";
      case "Arabia/Persia":
        return "ARB";
      case "Armenia":
        return "ARM";
      case "Azerbaijan":
        return "AZE";
      case "Austria":
        return "AUT";
      case "Belarus":
        return "BLR";
      case "Bosnia and Herzegovina":
        return "BIH";
      case "Bulgaria":
        return "BGR";
      case "China":
        return "CHN";
      case "Croatia":
        return "HRV";
      case "Czech Republic":
        return "CZE";
      case "Denmark":
        return "DNK";
      case "East Frisia":
        return "(EF) GER";
      case "Estonia":
        return "EST";
      case "Finland":
        return "FIN";
      case "France":
        return "FRA";
      case "Georgia":
        return "GEO";
      case "Great Britain":
        return "GBR";
      case "Greece":
        return "GRC";
      case "Germany":
        return "DEU";
      case "Hungary":
        return "HUN";
      case "Iceland":
      return "ISL";
      case "India/Sri Lanka":
        return "IND";
      case "Ireland":
        return "IRL";
      case "Israel":
        return "ISR";
      case "Italy":
        return "ITA";
      case "Japan":
        return "JPN";
      case "Kazakhstan/Uzbekistan,etc":
        return "KAZ";
      case "Korea":
        return "KOR";
      case "Kosovo":
        return "KOS";
      case "Latvia":
        return "LVA";
      case "Lithuania":
        return "LTU";
      case "Luxembourg":
        return "LUX";
      case "Macedonia":
        return "MKD";
      case "Malta":
        return "MLT";
      case "Moldova":
        return "MDA";
      case "Montenegro":
        return "MNE";
      case "Norway":
        return "NOR";
      case "other countries":
        return "other";
      case "Poland":
        return "POL";
      case "Portugal":
        return "PRT";
      case "Romania":
        return "ROU";
      case "Russia":
        return "RUS";
      case "Serbia":
        return "SRB";
      case "Slovakia":
        return "SVK";
      case "Slovenia":
        return "SVN";
      case "Spain":
        return "ESP";
      case "Sweden":
        return "SWE";
      case "Swiss":
        return "CHE";
      case "the Netherlands":
        return "NLD";
      case "Turkey":
        return "TUR";
      case "Ukraine":
        return "UKR";
      case "USA":
        return "USA";
      case "Vietnam":
        return "VNM";
    }
    return country;
  }

  /**
   * Labelled countries to be displayed in a graph.
   */
  public static readonly labelledCountries = [
    { value: 'albania', label: 'Albania (ALB)' },
    { value: 'arabiaPersia', label: 'Arabia / Persia (ARB)' },
    { value: 'armenia', label: 'Armenia (ARM)' },
    { value: 'austria', label: 'Austria (AUT)' },
    { value: 'azerbaijan', label: 'Azerbaijan (AZE)' },
    { value: 'belarus', label: 'Belarus (BLR)' },
    { value: 'bosniaAndHerzegovina', label: 'Bosnia and Herzegovina' },
    { value: 'bulgaria', label: 'Bulgaria' },
    { value: 'china', label: 'China' },
    { value: 'croatia', label: 'Croatia' },
    { value: 'czech', label: 'Czechia' },
    { value: 'denmark', label: 'Denmark' },
    { value: 'eastFrisia', label: 'East Frisia (NW) Germany)' },
    { value: 'estonia', label: 'Estonia' },
    { value: 'finland', label: 'Finland' },
    { value: 'france', label: 'France' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'germany', label: 'Germany' },
    { value: 'greece', label: 'Greece' },
    { value: 'hungary', label: 'Hungary' },
    { value: 'iceland', label: 'Iceland' },
    { value: 'indiaSriLanka', label: 'India / Sri Lanka' },
    { value: 'ireland', label: 'Ireland' },
    { value: 'israel', label: 'Israel' },
    { value: 'italy', label: 'Italy' },
    { value: 'japan', label: 'Japan' },
    { value: 'kazakhstanUzbekistan', label: 'Kazakhstan / Uzbekistan, etc.' },
    { value: 'korea', label: 'Korea' },
    { value: 'kosovo', label: 'Kosovo' },
    { value: 'latvia', label: 'Latvia' },
    { value: 'lithuania', label: 'Lithuania' },
    { value: 'luxembourg', label: 'Luxembourg' },
    { value: 'macedonia', label: 'North Macedonia' },
    { value: 'malta', label: 'Malta' },
    { value: 'moldova', label: 'Moldova' },
    { value: 'montenegro', label: 'Montenegro' },
    { value: 'theNetherlands', label: 'The Netherlands' },
    { value: 'norway', label: 'Norway' },
    { value: 'poland', label: 'Poland' },
    { value: 'portugal', label: 'Portugal' },
    { value: 'romania', label: 'Romania' },
    { value: 'russia', label: 'Russia' },
    { value: 'serbia', label: 'Serbia' },
    { value: 'slovakia', label: 'Slovakia' },
    { value: 'slovenia', label: 'Slovenia' },
    { value: 'spain', label: 'Spain' },
    { value: 'sweden', label: 'Sweden' },
    { value: 'swiss', label: 'Switzerland' },
    { value: 'turkey', label: 'Türkiye' },
    { value: 'ukraine', label: 'Ukraine' },
    { value: 'greatBritain', label: 'United Kingdom' },
    { value: 'usa', label: 'U.S.A.' },
    { value: 'vietnam', label: 'Vietnam' },
    { value: 'otherCountries', label: 'Other Countries' }
  ]

}