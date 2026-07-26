export function IsLoggedIn(baseUrl: string): Promise<boolean> {

  return fetch(`${baseUrl}/api/user/isLoggedIn`, {
      method: 'GET'     })
      .then((response) => {
             debugger;
        if (response.ok) {
        
          return response.text().then(data => {
            return data === 'true';
          });
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      })  
}

export function LogOut(baseUrl: string): Promise<boolean> {

  return fetch(`${baseUrl}/api/user/logout`, {
      method: 'POST'     })
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
}