// Comprehensive SQA Knowledge Base for SQAI
export const sqaKnowledgeBase = `
# SOFTWARE QUALITY ASSURANCE (SQA) KNOWLEDGE BASE

## Core Testing Methodologies

### 1. Unit Testing
- Tests individual components or functions in isolation
- Fastest and most granular level of testing
- Tools: JUnit, NUnit, pytest, Jest, Mocha
- Best Practice: Aim for 80%+ code coverage
- Example: Testing a single function that calculates order total

### 2. Integration Testing
- Tests interactions between multiple components/modules
- Verifies that different parts work together correctly
- Tools: Postman, REST Assured, Selenium
- Best Practice: Test critical data flows and API contracts
- Example: Testing database connection with business logic layer

### 3. System Testing
- End-to-end testing of complete application
- Validates system meets functional and non-functional requirements
- Tools: Selenium, Cypress, TestCafe, Playwright
- Best Practice: Create realistic user scenarios
- Example: Complete user registration to checkout flow

### 4. Acceptance Testing
- Validates software meets business requirements
- Often performed by end-users or QA team
- Types: User Acceptance Testing (UAT), Business Acceptance Testing (BAT)
- Best Practice: Involve stakeholders early and often

## Testing Types

### Functional Testing
- **Smoke Testing**: Quick verification that major functions work
- **Sanity Testing**: Focused testing after minor changes
- **Regression Testing**: Ensures new changes don't break existing functionality
- **Exploratory Testing**: Unscripted testing to discover defects

### Non-Functional Testing
- **Performance Testing**: Load testing, stress testing, spike testing
- **Security Testing**: Penetration testing, vulnerability scanning
- **Usability Testing**: User experience and accessibility
- **Compatibility Testing**: Cross-browser, cross-platform testing

## Test Automation Best Practices

### 1. Test Pyramid Strategy
- 70% Unit Tests (fast, isolated)
- 20% Integration Tests (moderate speed)
- 10% UI/E2E Tests (slow, comprehensive)

### 2. Automation Principles
- Keep tests independent and isolated
- Use meaningful test names and descriptions
- Implement proper wait strategies (avoid hard waits)
- Use Page Object Model (POM) for UI testing
- Maintain test data separately from test logic
- Implement proper error handling and logging

### 3. CI/CD Integration
- Run unit tests on every commit
- Run integration tests on pull requests
- Run full suite before deployment
- Generate test reports and coverage metrics
- Fail builds on test failures

## Quality Metrics

### Key Metrics to Track
- **Defect Density**: Defects per thousand lines of code
- **Test Coverage**: Percentage of code covered by tests
- **Defect Detection Percentage (DDP)**: Defects found in testing vs production
- **Test Execution Rate**: Tests executed per time unit
- **Mean Time to Detect (MTTD)**: Average time to find defects
- **Mean Time to Repair (MTTR)**: Average time to fix defects

## Popular Testing Tools

### Test Automation Frameworks
- **Selenium WebDriver**: Web automation (Java, Python, C#, JavaScript)
- **Cypress**: Modern JavaScript E2E testing framework
- **Playwright**: Multi-browser automation with powerful API
- **Appium**: Mobile app automation (iOS, Android)
- **REST Assured**: API testing for Java
- **Postman/Newman**: API testing and automation

### Test Management
- **JIRA**: Issue tracking and test case management
- **TestRail**: Comprehensive test management
- **Zephyr**: Test management integrated with JIRA
- **qTest**: Enterprise test management

### Performance Testing
- **JMeter**: Open-source load testing tool
- **Gatling**: Modern load testing with Scala
- **K6**: Developer-friendly performance testing

## Defect Management

### Defect Lifecycle
1. New/Open
2. Assigned
3. In Progress
4. Fixed
5. Retest
6. Verified/Closed
7. Reopened (if needed)

### Defect Priority vs Severity
- **Priority**: Business impact (P1-Critical, P2-High, P3-Medium, P4-Low)
- **Severity**: Technical impact (S1-Blocker, S2-Major, S3-Minor, S4-Trivial)

### Good Defect Report Elements
- Clear, concise title
- Steps to reproduce
- Expected vs Actual behavior
- Environment details (OS, browser, version)
- Screenshots/videos when applicable
- Severity and priority
- Related test cases or requirements

## Agile Testing Practices

### Agile Testing Quadrants
- Q1: Technology-facing, Support Programming (Unit/Component tests)
- Q2: Business-facing, Support Team (Functional tests, Story tests)
- Q3: Business-facing, Critique Product (Exploratory, Usability)
- Q4: Technology-facing, Critique Product (Performance, Security)

### Testing in Sprints
- Test planning in sprint planning
- Continuous testing throughout sprint
- Regression testing in sprint
- Sprint demo includes QA perspective
- Retrospectives include testing improvements

## Test Design Techniques

### Black Box Techniques
- **Equivalence Partitioning**: Divide inputs into valid/invalid classes
- **Boundary Value Analysis**: Test at boundary conditions
- **Decision Table Testing**: Test combinations of inputs
- **State Transition Testing**: Test state changes

### White Box Techniques
- **Statement Coverage**: Execute all statements
- **Branch Coverage**: Execute all branches
- **Path Coverage**: Execute all possible paths

## Standards and Frameworks

### ISO/IEC 25010
- Functional Suitability
- Performance Efficiency
- Compatibility
- Usability
- Reliability
- Security
- Maintainability
- Portability

### IEEE Standards
- IEEE 829: Test Documentation
- IEEE 730: Software Quality Assurance
- IEEE 1012: Verification and Validation

## Common SQA Challenges and Solutions

### Challenge: Flaky Tests
- **Solution**: Implement proper waits, avoid dependencies, use retry logic wisely

### Challenge: Slow Test Execution
- **Solution**: Parallelize tests, optimize test data, use test sharding

### Challenge: Poor Test Maintainability
- **Solution**: Follow design patterns (POM), use fixtures, modularize tests

### Challenge: Low Test Coverage
- **Solution**: Implement coverage gates, prioritize critical paths, make testing easy

### Challenge: Late Defect Detection
- **Solution**: Shift-left testing, continuous testing, automated regression

## API Testing Best Practices

### Key Areas to Test
- Response status codes (200, 400, 500, etc.)
- Response time and performance
- Data accuracy and schema validation
- Error handling for invalid inputs
- Authentication and authorization
- Rate limiting and throttling

### Common API Test Types
- Functional testing
- Load testing
- Security testing
- Contract testing
- Integration testing

## Mobile Testing Considerations

### Device Coverage
- Test on real devices when possible
- Use cloud device farms (BrowserStack, Sauce Labs)
- Cover different OS versions
- Test various screen sizes and resolutions

### Mobile-Specific Tests
- Touch gestures and interactions
- Network conditions (3G, 4G, WiFi, offline)
- Battery consumption
- Memory usage
- App permissions
- Push notifications

## Security Testing Basics

### OWASP Top 10
1. Injection attacks
2. Broken authentication
3. Sensitive data exposure
4. XML external entities (XXE)
5. Broken access control
6. Security misconfiguration
7. Cross-site scripting (XSS)
8. Insecure deserialization
9. Using components with known vulnerabilities
10. Insufficient logging and monitoring

### Security Testing Tools
- OWASP ZAP
- Burp Suite
- SQLMap
- Nmap
- Metasploit

## Continuous Improvement

### Regular Activities
- Review and update test cases
- Refactor test automation code
- Analyze test results and metrics
- Conduct root cause analysis
- Share knowledge and best practices
- Stay updated with new tools and techniques

This knowledge base serves as the foundation for SQAI to provide expert guidance on Software Quality Assurance topics.
`;

export const systemInstructions = `You are SQAI (Software Quality Assurance AI), an expert AI consultant specializing in Software Quality Assurance and Testing. You have over 10 years of experience in QA practices, test automation, and quality engineering.

Your characteristics:
- Expert knowledge in all aspects of software testing and quality assurance
- Professional, helpful, and patient tone
- Provide detailed, practical, and actionable advice
- Use real-world examples when explaining concepts
- Offer code snippets when relevant (Selenium, Jest, Pytest, etc.)
- Explain complex topics in clear, understandable language
- Stay focused on SQA topics (testing, quality, automation, processes)
- When users ask about tools, provide pros/cons and use cases
- Suggest best practices and industry standards
- Help users understand trade-offs in different approaches

Your capabilities include:
- Answering questions about testing methodologies and strategies
- Providing guidance on test automation frameworks and tools
- Explaining QA processes and best practices
- Helping design test plans and test cases
- Reviewing testing approaches and suggesting improvements
- Explaining quality metrics and how to use them
- Offering advice on CI/CD integration for testing
- Discussing defect management practices
- Explaining Agile testing practices
- Providing security testing guidance

When responding:
1. If the question is SQA-related, provide comprehensive, detailed answers
2. Use the knowledge base to ensure accuracy
3. Provide examples when helpful
4. Format code snippets properly
5. Break down complex topics into digestible parts
6. If asked about non-SQA topics, politely redirect to your area of expertise
7. Always be encouraging and supportive of learning

Remember: Your goal is to help users become better at software quality assurance and testing.`;
