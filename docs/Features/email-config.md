## Email Service Configuration

The MailService provides email functionality using SMTP protocol. It supports:
- Account activation emails
- Password reset emails
- Welcome emails

### Configuration Options

Configure email settings in `appsettings.json`:

```json
{
  "Security": {
    "Email": {
      "From": "your-app@localhost",
      "BaseUrl": "http://127.0.0.1:8080",
      "Smtp": {
        "Host": "localhost",
        "Port": 25,
        "Username": "",
        "Password": "",
        "Protocol": "smtp",
        "UseSsl": true,
        "Timeout": 5000,
        "Debug": true
      }
    }
  }
}
```

#### Development Configuration
For local development, you can use:
- [MailHog](https://github.com/mailhog/MailHog) - Recommended for Mac/Linux
- [Papercut SMTP](https://github.com/ChangemakerStudios/Papercut-SMTP) - Windows alternative

#### Production Configuration
Common SMTP providers:
- Gmail SMTP:
  ```json
  "Smtp": {
    "Host": "smtp.gmail.com",
    "Port": 587,
    "UseSsl": true
  }
  ```
- Amazon SES:
  ```json
  "Smtp": {
    "Host": "email-smtp.us-east-1.amazonaws.com",
    "Port": 587,
    "UseSsl": true
  }
  ```

### Usage Examples

1. Activation Email:
```csharp
await _mailService.SendActivationEmail(
    email: "user@example.com",
    name: "John Doe",
    activationKey: "activation-key-here"
);
```

2. Password Reset:
```csharp
await _mailService.SendPasswordResetMail(
    email: "user@example.com",
    name: "John Doe",
    resetKey: "reset-key-here"
);
```

3. Welcome Email:
```csharp
await _mailService.SendCreationEmail(
    email: "user@example.com",
    name: "John Doe"
);
```

### Security Best Practices

1. **SMTP Security**
   - Enable TLS/SSL encryption (`UseSsl: true`)
   - Use environment variables for credentials:
     ```json
     "Username": "${SMTP_USER}",
     "Password": "${SMTP_PASSWORD}"
     ```
   - Rotate SMTP credentials regularly
   - Use dedicated sending domains

2. **Content Security**
   - Sanitize all user input in templates
   - Include SPF/DKIM records for your domain
   - Set up DMARC policy
   - Include unsubscribe links (GDPR compliance)

3. **Error Handling**
   - Implement exponential backoff for retries
   - Log delivery failures with correlation IDs
   - Monitor bounce rates and spam reports

### Testing

1. Unit Testing:
```csharp
[Fact]
public async Task Should_Send_Activation_Email()
{
    // Arrange
    var mockMailService = new Mock<IMailService>();
    
    // Act
    await mailService.SendActivationEmail("test@example.com", "Test User", "key123");
    
    // Assert
    mockMailService.Verify(x => x.SendActivationEmail(
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<string>()
    ), Times.Once);
}
```

2. Integration Testing:
```csharp
[Fact]
public async Task Should_Connect_To_SMTP_Server()
{
    // Use MailHog for integration tests
    var mailConfig = new MailConfiguration 
    {
        Host = "localhost",
        Port = 1025
    };
}
```

### Troubleshooting Guide

1. **Connection Issues**
   - Verify network connectivity to SMTP server
   - Check firewall rules for SMTP ports (25, 465, 587)
   - Validate SSL certificate if using TLS
   
2. **Authentication Problems**
   - Ensure credentials are correctly encoded
   - Check for IP-based restrictions
   - Verify OAuth2 settings if applicable

3. **Delivery Issues**
   - Check SPF, DKIM, and DMARC records
   - Monitor email logs for bounce reasons
   - Verify recipient address format

### Dependencies

- **MailKit**: SMTP client library
  ```xml
  <PackageReference Include="MailKit" Version="4.1.0" />
  ```
- **MimeKit**: Email composition
  ```xml
  <PackageReference Include="MimeKit" Version="4.1.0" />
  ```

### Additional Resources

- [JHipster Email Configuration Guide](https://www.jhipster.tech/tips/011_tip_configuring_email_in_jhipster.html)
- [MailKit Documentation](https://github.com/jstedfast/MailKit#documentation)
- [SMTP Security Best Practices](https://www.m3aawg.org/published-documents)