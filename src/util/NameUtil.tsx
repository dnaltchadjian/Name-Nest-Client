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
        return "ESF";
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
        return "OTH";
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
    { value: 'bosniaAndHerzegovina', label: 'Bosnia and Herzegovina (BIH)' },
    { value: 'bulgaria', label: 'Bulgaria (BGR)' },
    { value: 'china', label: 'China (CHN)' },
    { value: 'croatia', label: 'Croatia (HRV)' },
    { value: 'czech', label: 'Czechia (CZE)' },
    { value: 'denmark', label: 'Denmark (DNK)' },
    { value: 'eastFrisia', label: 'East Frisia (NW) Germany (ESF)' },
    { value: 'estonia', label: 'Estonia (EST)' },
    { value: 'finland', label: 'Finland (FIN)' },
    { value: 'france', label: 'France (FRA)' },
    { value: 'georgia', label: 'Georgia (GEO)' },
    { value: 'germany', label: 'Germany (DEU)' },
    { value: 'greece', label: 'Greece (GRC)' },
    { value: 'hungary', label: 'Hungary (HUN)' },
    { value: 'iceland', label: 'Iceland (ISL)' },
    { value: 'indiaSriLanka', label: 'India / Sri Lanka (IND)' },
    { value: 'ireland', label: 'Ireland (IRL)' },
    { value: 'israel', label: 'Israel (ISR)' },
    { value: 'italy', label: 'Italy (ITA)' },
    { value: 'japan', label: 'Japan (JPN)' },
    { value: 'kazakhstanUzbekistan', label: 'Kazakhstan / Uzbekistan, etc. (KAZ)' },
    { value: 'korea', label: 'Korea (KOR)' },
    { value: 'kosovo', label: 'Kosovo (KOS)' },
    { value: 'latvia', label: 'Latvia (LVA)' },
    { value: 'lithuania', label: 'Lithuania (LTU)' },
    { value: 'luxembourg', label: 'Luxembourg (LUX)' },
    { value: 'macedonia', label: 'North Macedonia (MKD)' },
    { value: 'malta', label: 'Malta (MLT)' },
    { value: 'moldova', label: 'Moldova (MDA)' },
    { value: 'montenegro', label: 'Montenegro (MNE)' },
    { value: 'theNetherlands', label: 'The Netherlands (NLD)' },
    { value: 'norway', label: 'Norway (NOR)' },
    { value: 'poland', label: 'Poland (POL)' },
    { value: 'portugal', label: 'Portugal (POR)' },
    { value: 'romania', label: 'Romania (ROU)' },
    { value: 'russia', label: 'Russia (RUS)' },
    { value: 'serbia', label: 'Serbia (SRC)' },
    { value: 'slovakia', label: 'Slovakia (SVK)' },
    { value: 'slovenia', label: 'Slovenia (SVN)' },
    { value: 'spain', label: 'Spain (ESP)' },
    { value: 'sweden', label: 'Sweden (SWE)' },
    { value: 'swiss', label: 'Switzerland (CHE)' },
    { value: 'turkey', label: 'Türkiye (TUR)' },
    { value: 'ukraine', label: 'Ukraine (UKR)' },
    { value: 'greatBritain', label: 'United Kingdom (GBR)' },
    { value: 'usa', label: 'U.S.A. (USA)' },
    { value: 'vietnam', label: 'Vietnam (VNM)' },
    { value: 'otherCountries', label: 'Other Countries (OTH)' }
  ]

}