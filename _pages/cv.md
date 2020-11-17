---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* B.S. in Computer Engineering, Politecnico di Milano, 2017
* M.S. in Computer Engineering, Politecnico di Milano, 2019
* Ph.D in Engineering Science, University of Oxford, 2023 (expected)

Work experience
======
* Summer 2020: FDL Research Sprint
  * Frontiers Development Lab Europe (ESA/Trilium Technologies)
  * Duties included: Machine Learning Researcher, developed Bayesian Deep Learning and Probabilistic Programming models for satellite collision assessment.
  * Supervisor: A.B. Gunes, C. Bridges
  
Skills
======
* Probabilistic Programming
* Machine Learning and Deep Learning
* Computer Graphics and Video Game Development
* Robotics Simulations and SLAM
* Database management
* Full-Stack Web development
* Mobile App Developer
* Software Engineering

Publications
======
* Towards Automated Satellite Conjunction Management with Bayesian Deep Learning, F. Pinto, G. Acciarini, S. Metz, S. Boufelja, S. Kaczmarek, K. Merz, J. A.M.Heras, F. Letizia, C. Bridges, A.G. Baydin (AI4EarthSciences, NeurIPS 2020)}
* Spacecraft Collision Risk Assessment with Probabilistic Programming, G. Acciarini, F. Pinto, S. Metz, S. Boufelja, S. Kaczmarek, K. Merz, J. A.M.Heras, F. Letizia, C. Bridges, A.G. Baydin (ML4PS, NeurIPS 2020)
* SECI-GAN: Semantic and Edge Completion for dynamic objects removal, F. Pinto, A. Romanoni, M. Matteucchi, P.H.S. Torr (ICPR 2020)
  <ul>{% for post in site.publications %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
* FDL Europe Space Science and AI Showcase (Constellations Team): https://www.youtube.com/watch?v=kZxYMCKTo50 
  <ul>{% for post in site.talks %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
