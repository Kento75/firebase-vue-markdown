require 'net/http'
Knock.setup do |config|
  config.token_signature_algorithm = 'RS256'
  jwks_raw = Net::HTTP.get URI(ENV['AUTH0_JWKS'])
  jwks_keys = Array(JSON.parse(jwks_raw)['keys'])
  config.token_public_key = OpenSSL::X509::Certificate.new(
    Base64.decode64(jwks_keys[0]['x5c'].first)).public_key
end
