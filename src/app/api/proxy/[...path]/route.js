export async function GET(req, { params }) {
    return handleRequest(req, params.path);
  }
  
  export async function POST(req, { params }) {
    return handleRequest(req, params.path);
  }
  
  export async function PUT(req, { params }) {
    return handleRequest(req, params.path);
  }
  
  export async function DELETE(req, { params }) {
    return handleRequest(req, params.path);
  }
  
  export async function PATCH(req, { params }) {
    return handleRequest(req, params.path);
  }
  
  /**
   * Main handler function that proxies requests to the backend API
   */
  async function handleRequest(req, path) {
    // Construct the target API URL from the path parameters
    const apiUrl = `http://ec2-13-127-140-227.ap-south-1.compute.amazonaws.com:8000/${Array.isArray(path) ? path.join('/') : path}`;
    
    try {
      // Get request method
      const method = req.method;
      
      // Extract request body for non-GET/HEAD requests
      let body = undefined;
      if (method !== 'GET' && method !== 'HEAD') {
        try {
          body = await req.json();
        } catch (e) {
          // If there's no body or it's not JSON, we continue without it
          console.log('No JSON body or parse error:', e);
        }
      }
      
      // Prepare headers to forward
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Forward Authorization header if present
      const authHeader = req.headers.get('authorization');
      if (authHeader) {
        headers['Authorization'] = authHeader;
      }
      
      // Make the request to the backend API
      const response = await fetch(apiUrl, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      
      // Get the response data
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      // Create the response with appropriate status and headers
      if (contentType && contentType.includes('application/json')) {
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(data, {
          status: response.status,
          headers: { 'Content-Type': contentType || 'text/plain' }
        });
      }
    } catch (error) {
      console.error('API Proxy error:', error);
      
      // Return an error response
      return new Response(JSON.stringify({ 
        error: 'Error proxying to API',
        message: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }