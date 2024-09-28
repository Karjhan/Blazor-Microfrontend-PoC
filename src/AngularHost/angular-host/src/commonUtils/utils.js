export async function cssFileToSingleLineString(cssFilePath) {
    try {
      const response = await fetch(cssFilePath);
      if (!response.ok) {
        throw new Error(`Could not fetch CSS file: ${response.statusText}`);
      }
      let cssText = await response.text(); 
  
      cssText = cssText.replace(/\s+/g, ' ').trim(); 
  
      return cssText; 
    } catch (error) {
      console.error(error);
      return null; 
    }
}