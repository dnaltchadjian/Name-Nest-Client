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

  public static readonly labelledCountries = [
    { value: 'albania', label: 'Albania' },
    { value: 'arabiaPersia', label: 'Arabia / Persia' },
    { value: 'armenia', label: 'Armenia' },
    { value: 'austria', label: 'Austria' },
    { value: 'azerbaijan', label: 'Azerbaijan' },
    { value: 'belarus', label: 'Belarus' },
    { value: 'bosniaAndHerzegovina', label: 'Bosnia and Herzegovina' },
    { value: 'bulgaria', label: 'Bulgaria' },
    { value: 'china', label: 'China' },
    { value: 'croatia', label: 'Croatia' },
    { value: 'czech', label: 'Czechia' },
    { value: 'denmark', label: 'Denmark' },
    { value: 'eastFrisia', label: 'East Frisia (Northwestern Germany)' },
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