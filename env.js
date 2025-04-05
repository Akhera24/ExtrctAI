// env.js - Environment configuration for X-Analyzer
// This module exports configuration objects for Twitter and Grok AI APIs
// Environment variables are automatically injected by dotenv-webpack during build

// Define defaults that will be used if environment variables aren't available
const fallbacks = {
  twitter: {
    config1: {
      xApiKey: 'vXneBErjezw6yZGsQlInez3dK',
      clientId: 'UWJReXE3QkRDa2ZRcWtQTjlfbmY6MTpjaQ',
      clientSecret: '1awB42WKRnzOe2sb-ZIbL9Y19QjWp0kLnGhVWo56TfnyvrxkGl',
      bearerToken: 'AAAAAAAAAAAAAAAAAAAAAFfX0AEAAAAADmKcrctbEtzq0hT7ckBVhLCLzYk%3DE3sLVw1MUkwPCyQQqDHWexM4cE58GbJck18tzatJBdw0fHWxyB',
      accessToken: '1896347661881810944-VgxLCbICDt7TsZYlxfq8Pd7CdkQiEg',
      accessTokenSecret: '2LkInMdELdNnRumWRzjwJmExtkUJxpgagNY0uJ3Gm4w0g',
      baseUrl: 'https://api.twitter.com/2'
    },
    config2: {
      xApiKey: 'm9p0VJnDout4MotXQTl9OzgGL',
      xApiKeySecret: 'MqrbxtiViPkoddRNulQMfI6qMST5S8d37ySZLHPBQLVzwrxzyK',
      clientId: 'NkQ4LUtHV213R1FUN1cycDNlSFI6MTpjaQ',
      clientSecret: 'yJSFuCt1LEyTACRG73-hGlbhb-O6r0G_t9oxh4aZDCWh5vqzI4',
      bearerToken: 'AAAAAAAAAAAAAAAAAAAAAN0wkQEAAAAAwRj7dqJZwjV9vQ19dajRsyY9fmI=RY95NxBUr4TSTDobZuullTJJPbGQcvXZIwG5T5XZv7esNnj1AU',
      accessToken: '1896347661881810944-d7ToqPYH42yOSib2aSNw9HtAfwQHYn',
      accessTokenSecret: 'lgz4z1I08M7tYF0OiJ5fnAFrWvsesYGZ6mPsrDULD9BDW',
      baseUrl: 'https://api.twitter.com/2'
    }
  },
  grokAi: {
    apiKey: 'xai-qJ5Mf7jQ9667nJvXOAqJquJz9k0AZwyzzOC39vQIy62E9OkEYJdxvdYNgI1tteTJP8VlgmvT3uxH1Z9Q',
    baseUrl: 'https://api.grok.com/v1'
  },
  proxy: {
    enabled: true,
    host: '143.198.111.238',
    port: '3000',
    protocol: 'https',
    path: '/api/proxy',
    auth: {
      username: 'xanalyzer',
      password: 'pr0xy@cce$$' 
    },
    fallbackToDirect: true,
    timeout: 15000,
    retryAttempts: 3,
    retryDelay: 1000
  }
};

// Safer way to access environment variables in a browser extension
function getEnvVar(name, defaultValue) {
  try {
    // First try global __ENV__ from webpack DefinePlugin
    if (typeof __ENV__ !== 'undefined' && __ENV__ && __ENV__[name] !== undefined) {
      return __ENV__[name];
    }
    
    // For development/build-time only (will not exist in browser)
    if (typeof process !== 'undefined' && process.env && process.env[name] !== undefined) {
      return process.env[name];
    }
  } catch (e) {
    console.log(`Error accessing environment variable ${name}: ${e.message}`);
  }
  
  // Return fallback value if no environment variable found
  return defaultValue;
}

// Twitter API configurations
// We maintain two separate configs for redundancy and rate limit management
export const twitter = {
  // Primary Twitter API configuration
  config1: {
    xApiKey: getEnvVar('TWITTER_API_KEY', getEnvVar('TWITTER_API_1_X_API_KEY', fallbacks.twitter.config1.xApiKey)),
    clientId: getEnvVar('TWITTER_API_1_CLIENT_ID', fallbacks.twitter.config1.clientId),
    clientSecret: getEnvVar('TWITTER_API_SECRET', getEnvVar('TWITTER_API_1_CLIENT_SECRET', fallbacks.twitter.config1.clientSecret)),
    bearerToken: getEnvVar('TWITTER_BEARER_TOKEN', getEnvVar('TWITTER_API_1_BEARER_TOKEN', fallbacks.twitter.config1.bearerToken)),
    accessToken: getEnvVar('TWITTER_API_1_ACCESS_TOKEN', fallbacks.twitter.config1.accessToken),
    accessTokenSecret: getEnvVar('TWITTER_API_1_ACCESS_TOKEN_SECRET', fallbacks.twitter.config1.accessTokenSecret),
    baseUrl: getEnvVar('TWITTER_API_1_BASE_URL', fallbacks.twitter.config1.baseUrl)
  },
  // Secondary/backup Twitter API configuration
  config2: {
    xApiKey: getEnvVar('TWITTER_API_2_X_API_KEY', fallbacks.twitter.config2.xApiKey),
    xApiKeySecret: getEnvVar('TWITTER_API_2_X_API_KEY_SECRET', fallbacks.twitter.config2.xApiKeySecret),
    clientId: getEnvVar('TWITTER_API_2_CLIENT_ID', fallbacks.twitter.config2.clientId),
    clientSecret: getEnvVar('TWITTER_API_2_CLIENT_SECRET', fallbacks.twitter.config2.clientSecret),
    bearerToken: getEnvVar('TWITTER_API_2_BEARER_TOKEN', fallbacks.twitter.config2.bearerToken),
    accessToken: getEnvVar('TWITTER_API_2_ACCESS_TOKEN', fallbacks.twitter.config2.accessToken),
    accessTokenSecret: getEnvVar('TWITTER_API_2_ACCESS_TOKEN_SECRET', fallbacks.twitter.config2.accessTokenSecret),
    baseUrl: getEnvVar('TWITTER_API_2_BASE_URL', fallbacks.twitter.config2.baseUrl)
  }
};
  
// Grok AI API configuration
// Used for AI-powered content analysis and recommendations
export const grokAi = {
  apiKey: getEnvVar('GROK_AI_API_KEY', fallbacks.grokAi.apiKey),
  baseUrl: getEnvVar('GROK_AI_BASE_URL', fallbacks.grokAi.baseUrl)
};

// DigitalOcean proxy configuration
export const proxyConfig = {
  enabled: getEnvVar('DO_PROXY_ENABLED', 'true') === 'true',
  host: getEnvVar('DO_PROXY_HOST', fallbacks.proxy.host),
  port: getEnvVar('DO_PROXY_PORT', fallbacks.proxy.port),
  protocol: getEnvVar('DO_PROXY_PROTOCOL', fallbacks.proxy.protocol),
  path: getEnvVar('DO_PROXY_PATH', fallbacks.proxy.path),
  auth: {
    username: getEnvVar('DO_PROXY_USERNAME', fallbacks.proxy.auth.username),
    password: getEnvVar('DO_PROXY_PASSWORD', fallbacks.proxy.auth.password)
  },
  fallbackToDirect: getEnvVar('DO_PROXY_FALLBACK_DIRECT', 'true') === 'true',
  timeout: parseInt(getEnvVar('DO_PROXY_TIMEOUT', fallbacks.proxy.timeout)),
  retryAttempts: parseInt(getEnvVar('DO_PROXY_RETRY_ATTEMPTS', fallbacks.proxy.retryAttempts)),
  retryDelay: parseInt(getEnvVar('DO_PROXY_RETRY_DELAY', fallbacks.proxy.retryDelay))
};

// Construct the full proxy URL for convenient access
export const proxyUrl = `${proxyConfig.protocol}://${proxyConfig.host}:${proxyConfig.port}${proxyConfig.path}`;

// Token validation functions
const isValidBearerToken = (token) => {
  // Enhanced validation for bearer tokens
  if (!token || typeof token !== 'string') return false;
  
  // Clean the token from any potential URL encoding
  let cleanedToken = token;
  if (token.includes('%')) {
    try {
      cleanedToken = decodeURIComponent(token);
    } catch (e) {
      console.warn('Error decoding bearer token, using as-is');
    }
  }
  
  // Bearer tokens should start with AAAAA and be long enough
  const isValid = cleanedToken.trim().startsWith('AAAAA') && cleanedToken.trim().length > 50;
  
  // Log validation for debugging
  console.log(`Bearer token validation: token starts with "${cleanedToken.substring(0, 5)}...", length: ${cleanedToken.length}, valid: ${isValid}`);
  
  return isValid;
};

const isValidApiKey = (key) => {
  // Basic API key validation
  return !!key && typeof key === 'string' && key.trim().length >= 10;
};

// Validate API credentials
export function validateApiKeys() {
  // Check primary configuration
  const config1Valid = {
    bearerToken: isValidBearerToken(twitter.config1.bearerToken),
    apiKey: isValidApiKey(twitter.config1.xApiKey),
    clientId: isValidApiKey(twitter.config1.clientId),
    clientSecret: isValidApiKey(twitter.config1.clientSecret),
    accessToken: isValidApiKey(twitter.config1.accessToken),
    overall: false
  };
  
  // Set overall status for config1
  config1Valid.overall = config1Valid.bearerToken && config1Valid.apiKey;
  
  // Check secondary configuration
  const config2Valid = {
    bearerToken: isValidBearerToken(twitter.config2.bearerToken),
    apiKey: isValidApiKey(twitter.config2.xApiKey),
    apiKeySecret: isValidApiKey(twitter.config2.xApiKeySecret),
    clientId: isValidApiKey(twitter.config2.clientId),
    clientSecret: isValidApiKey(twitter.config2.clientSecret),
    accessToken: isValidApiKey(twitter.config2.accessToken),
    overall: false
  };
  
  // Set overall status for config2
  config2Valid.overall = config2Valid.bearerToken && config2Valid.apiKey;
  
  return {
    config1: config1Valid,
    config2: config2Valid,
    anyValid: config1Valid.overall || config2Valid.overall,
    detailedStatus: {
      config1: config1Valid,
      config2: config2Valid
    }
  };
}

// Run validation on startup and log results
const apiValidation = validateApiKeys();

// Log configuration and validation status
console.log('Environment loaded status:', {
  twitterConfig1Bearer: twitter.config1.bearerToken ? 'Available' : 'Missing',
  twitterConfig2Bearer: twitter.config2.bearerToken ? 'Available' : 'Missing',
  grokApiKey: grokAi.apiKey ? 'Available' : 'Missing',
  proxyConfig: {
    enabled: proxyConfig.enabled,
    host: proxyConfig.host ? 'Available' : 'Missing',
    url: proxyUrl,
    auth: proxyConfig.auth.username && proxyConfig.auth.password ? 'Available' : 'Missing'
  },
  apiValidation: {
    anyValid: apiValidation.anyValid,
    config1Valid: apiValidation.config1.overall,
    config2Valid: apiValidation.config2.overall
  }
});

export { apiValidation };