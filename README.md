# BitScript

<p align="center">
  <img src="public/Logo.svg" alt="BitScript Logo" width="300" />
</p>

<p align="center">
  Open-source Bitcoin Script learning platform and development environment
</p>

<p align="center">
  <a href="https://www.bitscript.app">View Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

BitScript is an open-source educational platform and development environment designed to help Bitcoin enthusiasts, developers, and learners understand and experiment with Bitcoin Script. It provides interactive tools, tutorials, and a sandbox environment to explore the capabilities of Bitcoin's scripting language.

## Features

- **Tutorials and Learning Modules**: Comprehensive learning materials for Bitcoin Script and core Bitcoin concepts
- **Interactive Script Sandbox**: Test and experiment with Bitcoin Script in real-time
- **RPC Explorer**: Interface with Bitcoin commands through a friendly UI
- **Transaction Deserialization**: Deserialize Bitcoin transaction data in real-time
- **Hash Calculator**: Various tools for cryptographic hash operations
- **Data Formatter**: Format various data types
- **Multisig Tools**: Create and manage multisig addresses
- **OP-CODE Visualizations**: Visualize OP-CODES in action
- **SCRIPT Visualizations**: Visualize various Bitcoin standard scripts in action

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn package manager
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Strata-Labs/BitScript.git
   cd BitScript
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory
   - Copy the contents of `.env.example` into `.env`
   - Update the variables as needed

4. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   yarn run dev
   ```

The application should now be running at `http://localhost:3000`.

## Contributing

We welcome contributions from developers of all skill levels! Here's how you can contribute to BitScript:

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing to the project.

### How to Contribute

1. **Find an Issue**: Browse the [Issues](https://github.com/Strata-Labs/BitScript/issues) section to find something to work on, or open a new issue if you've found a bug or have a feature request.

2. **Fork the Repository**: Create your own copy of the project to work on.

3. **Create a Branch**: Create a new branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**: Implement your changes, following the coding standards and guidelines.

5. **Commit**: Commit your changes with a descriptive message:

   ```bash
   git commit -m "Add feature: your feature description"
   ```

6. **Push Changes**: Push your changes to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**: Create a pull request from your branch to the main repository.

### Development Guidelines

- Follow the existing code style and naming conventions
- Write clear, descriptive commit messages
- Include comments for complex logic
- Update documentation for any new features or changes
- Test your code thoroughly before submitting a pull request

### Getting Help

If you need help with contributing, feel free to:

- Ask questions in the [Discussions](https://github.com/Strata-Labs/BitScript/discussions) section
- Reach out to the maintainers via email at [Jesus@setdev.com](mailto:Jesus@setdev.com) or [Twitter](https://x.com/bitscriptapp)

## License

BitScript is open-source software licensed under the [MIT License](LICENSE).

<p align="center">Made with ❤️ by <a href="https://setdev.com">Setdev Team</a></p>
