---
layout: page
title: About
permalink: /about/
subtitle: A Salesforce consultancy with deep DevOps expertise, based in Spain and Turkey.
description: "Idea Bulut Solutions is a Salesforce consultancy with deep DevOps expertise — 12+ years in the ecosystem, multi-cloud delivery, custom app development and managed packages. Based in Spain and Turkey, working remotely across the EU and with US clients."
---

Idea Bulut Solutions is a Salesforce consultancy with deep DevOps expertise. We help
Salesforce teams ship faster and safer — designing and running release pipelines, building
custom apps and managed packages, and keeping deployments moving — for teams across Spain,
Turkey, the EU and the US.

## What we bring
- **Deep expertise:** 12+ years in the Salesforce ecosystem, with senior, hands-on delivery on every engagement.
- **Tool-agnostic release management:** Salesforce CLI, GitHub Actions, Copado and Gearset — we adapt to your stack rather than forcing a tool.
- **Multi-cloud delivery:** from the core clouds (Sales, Service, Experience) through to Revenue, Data and Marketing Cloud.
- **Custom development and managed packages:** not just process — we build, including our published Toolbelt for Copado on the DevOps Exchange.

## Credentials
- **12+ years** in the Salesforce ecosystem.
- **Live product:** {% if site.toolbelt_exchange_url and site.toolbelt_exchange_url != "" %}[Toolbelt for Copado]({{ site.toolbelt_exchange_url }}){% else %}Toolbelt for Copado{% endif %}, our published app on the Copado DevOps Exchange.

## How we work
We bring senior, hands-on delivery to every engagement, scaling up or down as your delivery
needs change.

We're **security-conscious by default**: least-privilege access, human review of changes, and
no shortcuts that put a client's org or release pipeline at risk.

## Where we work
Based in **Spain and Turkey**. We deliver **remotely across the EU** and **work with US clients**.

<p style="margin-top:2rem;display:flex;gap:1rem;flex-wrap:wrap">
  <a class="btn btn--primary" href="{% if site.discovery_booking_url != '' %}{{ site.discovery_booking_url }}{% else %}{{ '/contact/' | relative_url }}{% endif %}"{% if site.discovery_booking_url != '' %} target="_blank" rel="noopener"{% endif %}>Book a free 15-min chat</a>
  {%- if site.consultation_booking_url and site.consultation_booking_url != "" %}
  <a class="btn btn--ghost" href="{{ site.consultation_booking_url }}" target="_blank" rel="noopener">Book a 60-min consultation</a>
  {%- endif %}
</p>
