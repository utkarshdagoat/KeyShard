<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/utkarshdagoat/KeyShard">
    <img src="images/logo.svg" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">KeyShard</h3>

  <p align="center">
     <b>KeyShard</b> facilitates distributed key generation using <b>FROST</b>, a threshold Schnorr signature scheme. Participants contribute to a multi-party computation protocol, generating key shares without learning the complete secret. Made on top of the <b><a href="https://fluence.dev/">Fluence Netowork</a></b> providing decentralized serverless compute/
    <br />
    <a href="https://github.com/utkarshdagoat/KeyShard"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/utkarshdagoat/KeyShard">View Demo</a>
    ·
    <a href="https://github.com/utkarshdagoat/KeyShard/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/utkarshdagoat/KeyShard/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][product-screenshot]

Centralized key management poses a serious risk to the cryptocurrency industry. Frequently, the private key used to transfer enormous sums of money is held by just one person. Because of this, hackers have an allure because it just takes <strong>one point of compromise</strong> to cause a disastrous loss.

<b>FROST</b> and other DKG protocols provide a workaround. The secure severless compute layer of Fluence, which guarantees no secret leaks, is leveraged by <b>KeyShard</b>, a DKG application based on the Fluence network, to address this difficulty. KeyShard uses FROST to generate threshold keys so that no participant ever knows the whole secret. High-value crypto transaction security is greatly increased as a result of the distribution of trust and the removal of the centralized attack vector.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Understanding KeyShard

### Understanding FROST(Flexible Round-Optimized Schnorr Threshold Signatures)
Here is the algorithm from the research paper

![Algorithm][frost-screenshot]


The implmentaion of the above algorithm is explained in [IMPLEMENTATION.md](https://github.com/utkarshdagoat/KeyShard/blob/master/IMPLEMENTATION.md)

### Architecture
![Architecture][architecture]

#### Frontend

Interacts with a Gateway residing in front of the Fluence peer-to-peer (P2P) network.

#### Gateway

It is the reverse proxy which calls the below aqua services. All the API's for the gateway can be found in
[API.md](https://github.com/utkarshdagoat/KeyShard/blob/master/API.md)

#### Aqua Services (DKG Service)

Acts as a serverless service deployed on the Fluence network.
Offers the following functionalities:
All the code can be found in `src/aqua/main.aqua`

##### dkg_part1(identifier, secret)

Initiates the DKG process for a participant.

- `identifier`: Unique identifier for the participant.
- `secret`: Global Secret all the parties decide on( used in FROST).

Returns a `Round1Result` containing:
- `round1_state`: Internal state used for subsequent rounds.
- `round1_msg`: Message to be broadcast to other participants in round 1 ( containing a FROST partial public key).
- `secret` : The secret in the prime field

##### combine_round1_msgs(round1_state, round1_messages, identifier)

Combines received round 1 messages.

- `round1_state`: Internal state from `dkg_part1`.
- `round1_messages`: Collection of messages received from other participants in round 1.
- `identifier`: Participant's identifier.

Returns a `Round1FinalState`: Updated internal state for round 2.

##### initiate_round2(round1_state)

Initiates round 2 of the DKG protocol.

- `round1_state`: Final state from `combine_round1_msgs`.

Returns a `Round2Result` containing:
- `round2_state`: Internal state for subsequent calls.
- `shares`: Participant's share of the generated key.

##### add_shares(round2_state, all_shares, identifier)

Aggregates key shares from other participants.

- `round2_state`: Internal state from `initiate_round2`.
- `all_shares`: Collection of key shares received from other participants.
- `identifier`: Participant's identifier.

Returns a `Round2FinalState`: Updated internal state for reconstruction.

##### end_round2(round2_state)

Finalizes the key generation process.

- `round2_state`: Final state from `add_shares`.

Returns an `EndRound2Result` containing:
- `share`: Participant's final key share.
- `pk`: Participant's public key derived from the share.
- `t_pk`: Threshold public key (likely reconstructed using a threshold of shares).

##### reconstruct_share(final_shares)

(Optional) Reconstructs the complete key if authorized.

- `final_shares`: Collection of final key shares from all participants.

Returns a `FinalResult` containing:
- `reconstructed_share`: The complete reconstructed key (accessible only to authorized parties).


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* Fluence cli
  ```sh
  curl -qsL https://raw.githubusercontent.com/fluencelabs/cli/main/install.sh | bash
  ```
<b>Ensure your node version is 18.x</b>

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/utkarshdagoat/KeyShard.git && cd keyShard
   ```
2. Start the local chain enviorment
   ```sh
   fluence local up
   ```
3. Build and deploy
   ```sh
   fluence build && fluence deploy myDeployment
   ```
4. Run the Gateway
   ```sh
   cd src/gateway && npm i && npm start
   ```
5. Run the frontend
   ```sh
   cd src/frontend && yarn && yarn dev
   ```
######  Voila! now keyShard Should be running on localhost:5173

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
### Adaptable and Expandable for DAO Governance:

- **Flexibility**: The FROST protocol allows for optimization based on network conditions by providing two or single communication rounds with preprocessing. Fluence scales effectively to handle an increasing number of users.
- **Advantages for DAOs**: DAOs may restrict access to sensitive resources and safely handle keys for a variety of governance tasks, such as multi-signature wallets. This strategy goes beyond DAOs. **KeyShard** is applicable to a number of scenarios that call for distributed and secure key generation, including secure communications, safe multi-party computation, secure collaboration platforms, secure bootstrapping for dApps, and secure key sharing for wallets and vaults.

#### **KeyShard**, built on the foundation of FROST DKG and Fluence, empowers secure and scalable distributed key generation for various applications, particularly within DAOs, fostering trust, transparency, and resilience in their governance processes.

**KeyShard** tackles a critical issue in cryptocurrency wallets and vaults: single points of failure from private keys. It leverages FROST DKG on the Fluence network to distribute key generation. Participants collaboratively create a secret key split into shares. No one holds the entire key, and a threshold of shares is needed for access. This eliminates a central point of attack and fosters secure, decentralized management of digital assets.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] **Advanced Threshold Schemes:** For a fixed threshold (t), KeyShard probably uses Shamir's Secret Sharing at the moment. Key reconstruction may be possible even in the event that a predetermined percentage of players are hostile or unavailable if more complex threshold mechanisms, such as Byzantine Fault Tolerance (BFT), are put into use.
- [ ] **Recovery Mechanisms:** In the event that essential shares are misplaced or compromised, a recovery mechanism may prove advantageous. This would entail integrating FROST DKG with a secure multi-party computation (MPC) protocol that permits share regeneration under particular circumstances and authorization processes.

See the [open issues](https://github.com/utkarshdagoat/KeyShard/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Research Papers
The Frost Paper
* [FROST: Flexible Round-Optimized Schnorr Threshold Signatures](https://eprint.iacr.org/2020/852.pdf)


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Utkarsh - [@utkarshdagoat](https://x.com/utkarshdagoat) - utkarsh382004@gmail.com

Project Link: [https://github.com/utkarshdagoat/KeyShard](https://github.com/utkarshdagoat/KeyShard)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/utkarshdagoat/KeyShard.svg?style=for-the-badge
[contributors-url]: https://github.com/utkarshdagoat/KeyShard/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/utkarshdagoat/KeyShard.svg?style=for-the-badge
[forks-url]: https://github.com/utkarshdagoat/KeyShard/network/members
[stars-shield]: https://img.shields.io/github/stars/utkarshdagoat/KeyShard.svg?style=for-the-badge
[stars-url]: https://github.com/utkarshdagoat/KeyShard/stargazers
[issues-shield]: https://img.shields.io/github/issues/utkarshdagoat/KeyShard.svg?style=for-the-badge
[issues-url]: https://github.com/utkarshdagoat/KeyShard/issues
[license-shield]: https://img.shields.io/github/license/utkarshdagoat/KeyShard.svg?style=for-the-badge
[license-url]: https://github.com/utkarshdagoat/KeyShard/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/image.png
[frost-screenshot]: images/frost.png
[architecture]: images/architecture.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 