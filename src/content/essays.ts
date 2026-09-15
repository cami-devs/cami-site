import type { Essay } from './types'

/**
 * Full text of the essays whose PDFs live in public/writing/. Transcribed
 * from those PDFs — inline footnote numbers were stripped for readability;
 * each essay's original bibliography/works cited is kept in full under
 * `sources`, and the page links back to the original PDF.
 */
export const essays: Essay[] = [
  {
    slug: 'venture-capital-gatekeeper',
    title: 'Who Gets a Cure: Venture Capital as Gatekeeper in Biomedical Translation',
    byline: ['Cami Yen', 'Stanford University'],
    note: {
      why: 'looking at early therapeutics at polaris made me realize biotech vc is governed by completely different legal and capital hurdles than regular tech.',
      takeaway: 'can we restructure early clinical syndication so viable cures do not stall simply due to misaligned capital incentives?',
    },
    pdf: '/writing/biotech_vc.pdf',
    body: [
      {
        type: 'p',
        text: 'Venture capital plays a central role in financing early-stage biotechnology development, as its investment criteria shapes therapeutic development patterns. By drawing on historical accounts of the emergence of biotechnology, empirical evidence on early-stage financing, and recent data on venture-backed clinical pipelines, this paper shows that venture capital uniquely supplies the risk tolerance, capital intensity and regulatory coordination required to advance high-risk therapies. However, the concentration of decision-making power in venture capital leads to public health priority mismatch, unequal bargaining power, information asymmetry, and competition conflicts. The paper argues that preserving translational capacity while mitigating these risks requires disclosure of portfolio conflicts and targeted public incentives that steer venture capital toward underfunded areas without undermining its role in translation.',
      },
      {
        type: 'p',
        text: 'Biomedical research routinely produces promising discoveries, but many never reach patients. Between preclinical insight and clinical deployment lies a set of practical, financial, and structural barriers often described in literature as the "valley of death." The editors of Nature Reviews Bioengineering (2023) describe this gap as one that "hinges on a connected ecosystem that includes academics, industry, funding agencies, investors and regulatory bodies." In other words, discovering a cure is more than just a scientific problem; it is also an operational and financial one. Scientists must design clinical trials, navigate regulatory approval pathways, and plan for market entry years before a therapy can reach patients, a process commonly referred to as biomedical translation. Individual researchers rarely possess the capital, regulatory expertise, trial design, and manufacturing planning, whereas venture capital supplies those capacities through staged financing and control.',
      },
      {
        type: 'p',
        text: 'The term "gatekeeper" used in this paper is a term coined by Kurt Lewin (1947) and later formalized in network sociology by Ronald Burt (1992). It is used to describe an actor positioned at the junction between a resource and the parties who need it who controls which ideas cross that boundary. In biomedical translation, venture capital occupies this structural position as it determines which scientific discoveries receive sustained investment and which are left behind. Though venture capital may privilege certain technologies and generate ethical tensions, this paper argues that venture capital functions as the primary enabler of biomedical translation as no alternative funding model provides comparable capital intensity, risk tolerance, and regulatory coordination for clinical translation.',
      },
      {
        type: 'p',
        text: 'In existing literature, scholars recognize that venture capital plays a major role in bridging the "valley of death" and separately identify ethical tensions in its practice. Scholarship offers less insight into ethical problems arising from venture capital’s gatekeeping power, since investors decide which therapies move forward and which never get the chance. This review spans: (1) venture capital’s rise in biotechnology; (2) why alternative funding mechanisms fall short; (3) venture capital’s structural advantages and selection dynamics; (4) ethical concerns that arise from those dynamics; and (5) the unresolved question that follows.',
      },
      {
        type: 'p',
        text: 'Venture capital has been intertwined with biotechnology translation since the inception of the industry. In Genentech: The Beginnings of Biotech, science historian Sally Smith Hughes (2013) documented how early VC firms did not merely finance Genentech but actively shaped which scientific discoveries were deemed worth developing, effectively functioning as gatekeepers over what counted as commercially translatable research. As venture capital funding has grown to become the primary bridge between academic science and clinical development, their gatekeeping role has only grown more consequential.',
      },
      {
        type: 'p',
        text: 'Economists William R. Kerr, Ramana Nanda, and Matthew Rhodes-Kropf (2014) extended this historical analysis by quantifying venture capital’s disproportionate influence on the economy in their widely recognized article, Entrepreneurship as Experimentation. They noted that: "as a rough benchmark, about 1000 of the over 500,000 firms founded each year in the United States obtain venture capital finance, but these firms account for about 40 percent of new US publicly-listed companies over the last three decades" (Kerr et al., 13). Their findings prove that a small investor group, venture capital, disproportionately shapes which therapies ever get a chance to become products, despite backing only a fraction of startups that reach public markets.',
      },
      {
        type: 'p',
        text: 'In biotechnology especially, venture-backed firms dominate the development pipeline. Professor So-Yeon Kang and her coauthors (2024) examined investments between January 2014 and March 2024. Linking proprietary venture capital deal data from Pitchbook to clinical trial records, Kang et al. focused on investment patterns across drug types, clinical trial phases, and therapeutic areas, identifying 3,749 biomedical venture investments with a median funding amount of $20 million per deal. Nearly half of identified deals were made to companies that had Phase 1 trials either underway or starting within 24 months of the investment, while only 4.5% were linked to companies with Phase 2 trials exclusively and 0.3% to Phase 3. The concentration of funding in the early stages is notable because Phase 1 represents the stage where therapies face the most risk. During this phase, efficacy remains undemonstrated and regulatory approval is years away; however, substantial capital is simultaneously required to initiate human trials. Venture capital is thus structurally positioned to fund biopharmaceutical development during these early, high-risk clinical stages.',
      },
      {
        type: 'p',
        text: 'Venture capital’s structural positioning is especially visible in the regulatory pathway, where there exists a gap between academic and industry-sponsored trials. Hoffmann and colleagues (2024) found that academic trials faced greater difficulty than industry-sponsored ones at two distinct stages: ethics committee review, where limited staffing slowed submissions, and communication with competent authorities over trial design and manufacturing compliance, where lack of experience led to inadequate documentation. Academic scientists are rarely equipped to manage either bottleneck. Venture-backed companies, by contrast, build regulatory expertise into their financing structure from the start, tying staged milestones to approval thresholds and bringing in consultants before each hurdle arises.',
      },
      {
        type: 'p',
        text: 'While Kang et al. and Hughes established venture capital’s historically significant role in the biotechnology market, neither fully explains why this centrality emerged. Understanding venture capital’s necessity requires examining why other potential funding sources like scientific grants and public markets fail to support early-stage biotech development.',
      },
      {
        type: 'p',
        text: 'Pierre Azoulay and Danielle Li (2020) examine grant impact in early biomedical research, arguing that competitive grants work best in environments with large knowledge spillovers and open-ended research problems. Federal agencies like the National Institutes of Health (NIH) fit this model well, prioritizing academic laboratories and student training because these investments generate broad scientific knowledge that benefits the wider research community. However, this same structure is poorly suited for translation. In reality, academic grants reward publications and conference presentations, not the slow, regulated, operational steps of multi-year clinical development that determine whether a promising therapy actually reaches patients.',
      },
      {
        type: 'p',
        text: 'Kerr, Nanda, and Rhodes-Kropf similarly examined why public markets and big pharma companies cannot serve early stage biomedical innovation. By analyzing firm-level constraints and investment cycles, they found that public equity markets were too focused on quarterly earnings to handle development timelines that span many years. Likewise, they discussed how internal politics in large pharmaceutical firms—budgeting that favored safe bets and a culture that penalized managers for failed projects—stifled innovation (Kerr et al., 6). They concluded that while these giants were effective at improving existing drugs, their structure fails to support exploring uncertain new science.',
      },
      {
        type: 'p',
        text: 'Grant funding prioritizes spillovers and scientific knowledge advancement; public markets demand short-term returns; and big pharma is too risk-averse for unproven technologies. When combined, these findings reveal a significant institutional gap: traditional capital lacks the necessary risk tolerance. The constraints of biomedical translation, including long timelines and high failure rates, fail to match the incentive structures of grants, public markets, or established firms. Early clinical translation thus depends on investors willing to tolerate such conditions, which positions venture capital as the key enabler.',
      },
      {
        type: 'p',
        text: 'Literature characterizes venture capital as resilient relative to other biomedical funding sources. Economists Josh Lerner and Ramana Nanda (2020) demonstrated that venture capital’s continual support persists across different technological waves and through various market cycles through historical industry data (Lerner and Nanda, 238). They attributed this consistency to more than just capital. In their view, venture funds also supplied governance, hiring, regulatory consultants, and commercialization planning, rendering venture-backed firms with the operational infrastructure to sustain development through market downturns.',
      },
      {
        type: 'p',
        text: 'Recent market data reinforces this point. Emily Capra (2023), an editor at McKinsey, analyzed biotech financing between 2021 and 2023 and documents a sharp contraction in public biotech equity markets during this period, which contrasted the comparatively stable venture investing. She attributed venture capital’s stable investments to their sensitivity to market signals and ability to reallocate investment, noting a shift toward emerging areas such as machine learning-enabled drug discovery, cell therapies, and precision medicine platforms.',
      },
      {
        type: 'p',
        text: 'However, such selective reallocation risks narrowing investment to a concentrated set of therapeutic areas. Kang et al. found that within a large dataset of 3,749 biomedical venture investments, 73.8% targeted small-molecule drugs, 12.5% focused on biologics, and only 0.6% supported gene therapies, with 27.8% of investments concentrated in oncology (Kang et al., 2). These categories are not ethically neutral: small molecules and cancer drugs tend to command high prices and serve wealthy-country patient populations, making them more financially attractive than therapies targeting rare diseases or neglected conditions. When capital clusters this heavily, rare diseases or treatment for disadvantaged communities are deprioritized by projected return.',
      },
      {
        type: 'p',
        text: 'In plain terms, venture capital decides which ideas receive an early opportunity and the sustained resources necessary to survive. Kerr, Nanda, and Rhodes-Kropf describe this mechanism directly: venture firms fund multiple early-stage projects, discontinue those that underperform as data emerges, and scale the few that demonstrate commercial promise (Kerr et al., 12). For example, after interim Phase 1 data, investors may decide whether to finance a costly Phase 2 trial, pivot the therapy toward a more commercially viable indication, or terminate the program altogether. Selection therefore occurs at two stages—both at initial funding and at subsequent rounds that determine whether a therapy advances toward market.',
      },
      {
        type: 'p',
        text: 'Gatekeeping at both stages raises critical ethical questions: if venture capital prioritizes therapies based on commercial viability rather than medical need, patients with rare diseases or conditions requiring novel therapeutic approaches may be systematically disadvantaged. When the primary mechanism of biomedical translation allocates resources according to market logic, the resulting therapeutic landscape may reflect profit potential more than public health priorities. Venture capital-led translation therefore demands ethical scrutiny.',
      },
      {
        type: 'p',
        text: 'Existing literature underscores a significant tension between the scientific goals of biotechnology and the financial requisites of venture capital.',
      },
      {
        type: 'p',
        text: 'Lehoux and colleagues (2016) observe directly that venture capital "is not designed to fulfil society\'s most urgent public health priorities," a characterization the investment data supports rather than contradicts. The underlying survey data, reported by Ackerly and colleagues (2009), found that up to 85% of capital investors rated public health impact as "not at all or somewhat important" to their investment decisions. The finding describes a mandate, not an indictment of individual investors. Venture capital is structured to generate portfolio returns within a defined time horizon, and public health impact is rarely legible within that scope. The consequence is a structural market failure: when commercial return is the primary selection criterion, therapeutically important but commercially unattractive disease areas go underfunded, as the incentive structure fails to price in that value regardless of investor intent.',
      },
      {
        type: 'p',
        text: 'Beyond decisions about which ventures to fund, ethical tensions also arise in the criteria and processes through which those investment decisions are made. Through twelve vignettes, professors Yves Fassin and Will Drover analyze conflicts arising from power and information asymmetry. With these stories, they form categories for ethical failures: operational, strategic, governance, relational, and ownership issues. Fassin and Drover reveal how these ethical failures arise in common venture practices, such as unequal bargaining power and opaque financial arrangements, thereby raising ethical concerns even when those practices are legally permissible. In one vignette case, for example, "one angel investor is pressured to sign a proxy to allow the capital increase to be executed and hence agrees with a serious dilution without having been consulted throughout the negotiations and without having received key documents, which the law requires" (Fassin and Drover, 659). This is an example of how standard financing mechanics can become ethically indefensible even when no law is explicitly broken.',
      },
      {
        type: 'p',
        text: 'Ethical concerns are not limited to conflicts within a single venture-backed company; rather, they also emerge from the structure of venture firms themselves, which commonly hold stakes in multiple startups simultaneously. This risk is known as "competitive information leakage" (Cox Pahnke et al., 1334). Emily Cox Pahnke, a professor at the University of Washington, and her colleagues document how confidential technical and strategic data can flow between rival startups through "indirect transfers" of shared investor networks and board members (Cox Pahnke et al., 1336). Those in these networks may unintentionally carry insights from one startup to another, suggesting that the venture structure itself can compromise the competitive integrity of the very innovations it claims to support. In life sciences especially, where a single breakthrough can determine whether a treatment reaches patients or stalls in development, this compromise is a public health one.',
      },
      {
        type: 'p',
        text: 'The literature concurs that venture capital is structurally necessary for biomedical translation but accentuates an unresolved tension. Hughes, Azoulay and Li, Kerr et al., and Lerner and Nanda show that venture capital uniquely fills the gap between discovery and clinical viability that grants and large firms cannot. Concurrently, scholars reflect on the ethical concerns of the power venture capital holds over biotechnology innovation. Kang et al. discuss concentration in certain diseases and modalities; Lehoux et al. identify conflicts with public health goals; Fassin and Drover examine power asymmetries; and Cox Pahnke et al. show distorted competition. There exists a paradox here: the traits that make venture capital effective—risk tolerance, staged funding, rapid failure, investor control—also centralize power over which therapies advance.',
      },
      {
        type: 'p',
        text: 'The literature has not resolved how to reduce the ethical risks of venture capital’s gatekeeping while preserving its translational capacity. This paper therefore argues that, although venture capital inevitably privileges certain biomedical technologies and generates ethical tensions, the solution is developing governance and incentive mechanisms that preserve venture capital’s translational capacity.',
      },
      {
        type: 'p',
        text: 'The literature reveals a central paradox: venture capital is structurally necessary for bridging the valley of death, yet its reliance on market-based selection shapes which therapies ultimately advance. When returns become the gatekeeping criterion for clinical advancement, the therapeutic landscape reflects market optimization rather than disease burden and public health need. Yet no alternative funding model provides the requisite capital intensity, regulatory help, and risk tolerance to move therapies through early clinical stages; eliminating or substantially restricting venture participation would likely deepen the valley of death, rather than bridge it. Consequently, the issue at hand is how its gatekeeping power can be constrained without undermining its translational capacity. Two categories of reform illustrate the possibility: disclosure requirements that make gatekeeping visible, and targeted public incentives—like the Orphan Drug Act and the Priority Review Voucher program—that expand the frontier of commercially viable development.',
      },
      {
        type: 'p',
        text: 'One way to constrain its gatekeeping power is to introduce layered governance mechanisms that impose accountability and make selection criteria more transparent. Developments in ESG disclosure within biotech suggest that this is feasible. As Forbess and Llewellyn document, ESG reporting among public biotech companies doubled between 2021 and 2022 (Forbess and Llewellyn, 2022). In these, companies identify which board committee oversees ESG, describe data verification strategies, and implement disclosure requirements to ensure consistency across filings. Standards like the SASB Biotechnology & Pharmaceuticals Index, a framework that sets baseline expectations for what companies must report on clinical, ethical, and access-related practices, force companies to report clinical trial practices, business ethics, patient safety, and access to medicines, all areas vital to venture-backed development. Extending this discipline to venture-backed pipelines before IPO is achievable: academic medical centers and venture funds could require similar reporting through term sheets or partnership agreements, embedding disclosure obligations at the point of investment rather than waiting for public markets to impose them. Doing so would require funds to disclose portfolio overlaps, board interlocks, and conflicts between competing firms — precisely the information that renders gatekeeping visible and therefore contestable.',
      },
      {
        type: 'p',
        text: 'Beyond increasing governance mechanisms, a deeper intervention would focus on restructuring incentives so that treatments with high public health value but low expected returns can attract sustained investment. The Orphan Drug Act of 1983 illustrates the first such mechanism. As Saltonstall, Ross, and Kim explain, Congress addressed rare disease underinvestment by granting seven years of market exclusivity, a substantial tax credit for clinical testing, and federal research grants (Saltonstall et al., 2024). These provisions altered the risk-reward profile of rare disease development. Prior to the Act, only 38 rare disease drugs had received FDA approval; by the end of 2022, 882 drugs had been approved to treat 392 rare conditions, and orphan drugs now account for a substantial share of innovative FDA approvals. The ODA therefore illustrates that venture investment patterns can be steered by adjusting exclusivity, risk, and return without dismantling the market-based model itself. Yet incentives can also create pricing and gaming concerns, so policy design matters: the ODA has faced criticism for enabling firms to repurpose existing drugs for rare indications to capture exclusivity benefits without proportional therapeutic innovation. Extending such mechanisms to other underserved areas would require calibrated eligibility criteria and market pricing review to prevent the same distortions.',
      },
      {
        type: 'p',
        text: 'The Priority Review Voucher program, established in 2012 for rare pediatric diseases, illustrates a second policy mechanism that reshapes venture opportunity without constraining market logic. Under the program, companies that develop and gain FDA approval for novel therapies treating designated rare pediatric diseases receive a tradeable voucher granting expedited regulatory review for an unrelated drug candidate (National Organization for Rare Disorders, 2025). Critically, the voucher itself becomes a financial asset that companies can sell. Since the program\'s inception, 63 vouchers have been awarded across 47 rare pediatric diseases, of which only four had any FDA-approved treatments before 2012. Of these diseases, 29 vouchers have been redeemed to date for 26 different drugs. The redeemed vouchers have supported drugs largely outside the Medicare top-spending categories, suggesting the program has steered investment toward genuinely neglected areas rather than blockbuster opportunities. By converting regulatory authority into transferable financial instruments, the PRV program accomplishes what the ODA achieved through market exclusivity and tax credits: it makes commercially unattractive disease areas profitable to develop. The mechanism differs in form but shares the core principle: policy creates new value capture opportunities rather than constraining where venture capital can operate.',
      },
      {
        type: 'p',
        text: 'Together, these interventions reflect a broader principle: preserving venture capital\'s translational capacity and addressing its mandate gap are not competing goals. Disclosure of portfolio conflicts makes the gatekeeping function visible and contestable without disrupting the financing structures that make early clinical translation possible. Targeted public incentives, modeled on the ODA and PRV programs, expand the frontier of where venture capital can profitably operate rather than constrain it. The therapeutic landscape will continue to reflect market optimization over disease burden until the incentive structure prices in public health value — and well-designed policy is the mechanism for doing that.',
      },
      {
        type: 'p',
        text: 'Biomedical research continues to produce promising discoveries, yet crossing the valley of death still depends heavily on venture capital to finance, govern, and coordinate early clinical translation. Grants, public markets, and large pharmaceutical firms rarely provide comparable risk tolerance, capital intensity, or regulatory support at this stage. Venture capital thus shapes which therapies reach the clinic and which remain undeveloped. Because these choices follow market incentives more closely than public health needs, biomedical innovation tends to favor commercially attractive diseases and patient populations over neglected ones. As reliance on private capital intensifies, policy must govern this gatekeeping power with greater precision. Stronger transparency in venture-backed pipelines, disclosure of portfolio conflicts, and targeted incentives for underserved areas would sustain translational investment while directing biomedical development more closely toward public health priorities. How the bridge across the valley of death is structured will help determine not only which therapies survive, but which patients and communities ultimately benefit from scientific progress and which new markets venture capital gets to build.',
      },
    ],
    sources: [
      'Ackerly, D. C., Valverde, A. M., & Diener, L. W. (2009). Fueling innovation in medical devices (and beyond): Venture capital in health care. Health Affairs, 28(1), w68–w75.',
      'Azoulay, P., & Li, D. (2020). Scientific grant funding. NBER Working Paper 26889.',
      'Burt, R. S. (1992). Structural holes: The social structure of competition. Harvard University Press.',
      'Capra, E. (2023, December 12). Venture capital funding trends in biotechnology. McKinsey & Company.',
      'Cox Pahnke, E., McDonald, R., Wang, D., & Hallen, B. L. (2015). Exposed: Venture capital, competitor ties, and entrepreneurial innovation. Academy of Management Journal, 58(5), 1334–1360.',
      'Fassin, Y., & Drover, W. (2017). Ethics in entrepreneurial finance: Exploring problems in venture partner entry and exit. Journal of Business Ethics, 140(4), 649–672.',
      'Forbess, J., & Llewellyn, R. C. (2022, December 3). The evolution of ESG disclosure for biotech companies. Harvard Law School Forum on Corporate Governance.',
      'Hoffmann, J. M., Bauer, A., & Grossmann, R. (2024). Academic vs. industry-sponsored trials: A global survey on differences, similarities, and future improvements. Journal of Global Health, 14, 04204.',
      'Hughes, S. S. (2013). Genentech: The beginnings of biotech. University of Chicago Press.',
      'Kang, S. Y., Liu, M., Ballreich, J., Gupta, R., & Anderson, G. (2024). Biopharmaceutical pipeline funded by venture capital firms, 2014 to 2024. Health Affairs Scholar, 2(10), qxae124.',
      'Kerr, W. R., Nanda, R., & Rhodes-Kropf, M. (2014). Entrepreneurship as experimentation. Journal of Economic Perspectives, 28(3), 25–48.',
      'Lehoux, P., Miller, F. A., & Daudelin, G. (2016). How does venture capital operate in medical innovation? BMJ Innovations, 2(3), 111–117.',
      'Lerner, J., & Nanda, R. (2020). Venture capital\'s role in financing innovation: What we know and how much we still need to learn. Journal of Economic Perspectives, 34(3), 237–261.',
      'Lewin, K. (1947). Frontiers in group dynamics II. Human Relations, 1(2), 143–153.',
      'National Organization for Rare Disorders. (2025, November 6). Impact of the rare pediatric disease priority review voucher program on drug development (Publication No. NRD-2342).',
      'Nature Reviews Bioengineering. (2023). Traversing the valley of death. Nature Reviews Bioengineering, 1, 875.',
      'Saltonstall, P., Ross, H., & Kim, P. T. (2024). The Orphan Drug Act at 40: Legislative triumph and the challenges of success. The Milbank Quarterly, 102(1), 83–96.',
    ],
  },
  {
    slug: 'schubert-musical-architecture',
    title: 'Melodic Transcendence in a Dichotomy: Schubert’s Exploration of Life and Death',
    byline: ['Camilla Yen', 'Lyne Hileman', '15 December 2023'],
    video: 'https://www.youtube.com/watch?v=HGu5ZYG1RiQ',
    // PLACEHOLDER — rewrite in your own words
    note: {
      why: 'why you wrote this piece',
      takeaway: 'what you want a reader to take away from it',
    },
    pdf: '/writing/schubert.pdf',
    body: [
      {
        type: 'p',
        text: 'Many believe that certain pieces of music become lifelong companions. For me, no piece embodies this more than Franz Schubert’s Third Impromptu from Op. 90. I have played it enough times that its melody feels almost instinctive: a quiet, singing line floating above a constant stream of broken chords. For years, I heard the piece simply as peaceful. But the more I learned about Schubert and began looking beneath its surface, the more complicated that peace became. What I once heard as a serene stream began to sound like something more human: moments of innocence, fear, pain, acceptance, and solitude unfolding within the same piece.',
      },
      {
        type: 'p',
        text: 'Schubert was diagnosed with syphilis in the summer of 1822 and subsequently fell into a deep depression, describing himself as "the most unhappy and wretched creature in the world" (Schubert, 1826). His symptoms later eased, and in 1827, one year before his death, he composed eight impromptus, including the four eventually published as Op. 90. Around the same time, he was writing Winterreise, a song cycle filled with images of isolation, loss, and death. I cannot know whether Schubert intended the Third Impromptu to reflect his illness or mortality, and I do not want to impose a meaning onto the piece that he never intended. Still, knowing his circumstances has made it impossible for me to hear the music in quite the same way.',
      },
      {
        type: 'p',
        text: 'That realization began with something I had never paid much attention to: the broken chords beneath the melody. They are present almost continuously, flowing underneath the melody like water. I had always imagined the opening as a peaceful stream, so I was surprised to hear renowned pianist András Schiff use almost exactly the same image in a 2016 masterclass. Schiff encouraged a student to play the chords like the calm flow of water in a babbling brook. His description stayed with me because it gave words to something I had instinctively felt while playing.',
      },
      {
        type: 'p',
        text: 'But after studying the piece more closely, I began to wonder whether the stream was really as peaceful as I had thought.',
      },
      {
        type: 'p',
        text: 'Schubert wrote during the transition between the Classical and Romantic periods, and the Third Impromptu carries qualities of both. Its ternary structure and recurring themes reflect the Classical tradition, while its lyricism, rich harmonies, and emotional ambiguity feel distinctly Romantic. I became particularly interested in the way Schubert repeats musical ideas. The melody returns again and again, but rarely exactly as before. He changes the harmony and decorates familiar ideas with additional non-chord tones, making something recognizable feel subtly different each time. To me, this began to resemble memory: returning to something familiar while never experiencing it in exactly the same way.',
      },
      {
        type: 'p',
        text: 'The melody in mm. 9–16 is where I hear this most clearly. Its simplicity makes it feel almost intimate. Beneath it, the opening harmonic progression—tonic, submediant, supertonic, and authentic cadence—provides a gentle foundation. At first, there is little reason to feel uneasy. The music seems content simply to exist. That was how I originally understood the piece: beautiful, but uncomplicated. Then, I examined the key of the piece.',
      },
      {
        type: 'p',
        text: 'Schubert chose G-flat major, a notoriously difficult key for both composers and pianists. His publishers apparently considered the choice so impractical that they originally published the Impromptu in G major instead, believing G-flat major would be too difficult for pianists to play. Yet today, G-flat major is inseparable from the identity of the piece. I find that irony fitting. What initially seems unnecessarily difficult becomes part of what makes the piece distinctive.',
      },
      {
        type: 'p',
        text: 'More importantly, Schubert spends much of the opening A section firmly within G-flat major. The limited harmonic movement contributes to the feeling of stability I had always associated with the opening. Knowing Schubert\'s fluctuating health, I began to hear this stability differently. I imagined a moment in which life could still feel normal—a period of relative calm in which perhaps the future did not seem quite so threatening. I cannot know whether Schubert heard it that way, but that possibility changed the way I played the opening. I became less interested in making it merely "beautiful" and more interested in preserving its innocence.',
      },
      {
        type: 'p',
        text: 'The B section disrupts that innocence. In m. 25, Schubert moves from G-flat major to its relative minor, E-flat minor. The modulation itself is not particularly surprising for a piece in ternary form, but its effect on the character of the music is. From E-flat minor, he moves into C-flat major in m. 31. The melody becomes quieter while the harmonies become more elaborate, and suddenly the music feels almost eerie. When Schubert returns to E-flat minor in m. 40, the darkness recedes almost as quickly as it appeared.',
      },
      {
        type: 'p',
        text: 'I find this fleeting quality important. The music does not become consumed by despair. Instead, it seems to acknowledge something painful and then move past it. That made me reconsider what I had previously thought of as the piece\'s "peacefulness." Perhaps peace does not mean the absence of pain. Perhaps it can mean experiencing pain without allowing it to consume you.',
      },
      {
        type: 'p',
        text: 'The return of the A section makes this even more striking. The first sixteen measures of the final A section, mm. 55–70, are essentially identical to the opening. Yet after hearing the B section, I cannot hear them in the same way. The melody has not changed, but I have. What initially sounded like uncomplicated serenity now feels more reflective, almost as though the music remembers everything that came before it. Even the coda carries traces of the earlier C-flat major harmonies, allowing the uneasiness of the B section to linger beneath the familiar surface.',
      },
      {
        type: 'p',
        text: 'And then, just when the piece seems ready to end peacefully, Schubert surprises me. In mm. 79–81, he suddenly moves to G minor. The modulation lasts only three measures, but it feels startling because G minor is so distant from the harmonic world he has established. It is almost as though the music briefly resists the ending it seemed destined for. I hear this moment as one last attempt to change course—to escape the calm that has gradually returned. But the attempt lasts only three measures. Schubert returns to the serene material of the opening, and the piece ends as quietly as it began.',
      },
      {
        type: 'p',
        text: 'This is the moment that has changed my interpretation of the entire piece. I no longer hear the ending as simply peaceful. I hear it as acceptance. The music does not defeat its darker moments or pretend they never happened. It passes through them and eventually returns to the same melody, but with a different understanding of it.',
      },
      {
        type: 'p',
        text: 'That interpretation has also changed how I want to play the Impromptu. I want the opening to feel innocent rather than merely soft; the B section to feel unsettled rather than simply louder; and the final return to feel reflective rather than repetitive. I especially want to bring attention to the C-flat major passage between mm. 31–40 and the unexpected G-minor modulation in mm. 79–81. These moments can easily disappear beneath the flowing eighth notes, but to me, they are where the piece becomes most human.',
      },
      {
        type: 'p',
        text: 'Arguably, some of the world\'s greatest pianists have recorded the Impromptu, including Vladimir Horowitz, Daniel Barenboim, Krystian Zimerman, and Murray Perahia. Each plays the same notes differently. I used to think that meant there was a correct interpretation I had yet to discover. Now I think that is part of what makes the piece a lifelong companion. The notes do not change, but I do. The piece that sounded simply peaceful to me years ago can now sound nostalgic, uncertain, or even mournful depending on what I bring to it.',
      },
      {
        type: 'p',
        text: 'Perhaps that is why I keep returning to Schubert\'s Third Impromptu. Like a lifelong companion, it has remained the same while my understanding of it has changed. I began by hearing a peaceful stream. I now hear something moving beneath the water: a person confronting uncertainty, briefly losing his way, and ultimately returning to stillness. Whether or not that was what Schubert intended, it is what the piece has come to mean to me.',
      },
    ],
    sources: [
      '"Impromptus, D.899 (Op.90) - Complete Score." IMSLP.',
      'Greenberg, Robert. "Music History Monday: Schubert\'s Death." Robert Greenberg Music.',
      '"Schubert\'s Impromptus." Interlude.',
      '"Schubert Impromptu G-Flat Major, Op. 90 No. 3 Analysis." Pianist Musings, 22 Feb. 2019.',
    ],
  },
  {
    slug: 'keynesian-multipliers',
    title: 'Franklin D. Roosevelt’s Keynesian Turn: Reshaping Economic Paradigms',
    byline: ['Camilla Yen', 'Chelsea Denlow', '11th Grade History', '1 April 2024'],
    // PLACEHOLDER — rewrite in your own words
    note: {
      why: 'why you wrote this piece',
      takeaway: 'what you want a reader to take away from it',
    },
    pdf: '/writing/keynes.pdf',
    body: [
      {
        type: 'p',
        text: 'Characterized by a period of rapid innovation in labor practices, the American economy grew by 42% in the 1920s. This was exemplified by Henry Ford’s groundbreaking car design and pioneering assembly line, both of which revolutionized manufacturing and human life. However, amidst this era of progress, the abrupt crash of the stock market plunged the nation into a state of depression; as a result, people grew increasingly cautious about their spending habits, prioritizing saving over spending. The reduced money circulation and decreased demand for goods and services contributed to the sharp rise in the unemployment rate. Presidents urgently addressed these economic concerns through policy ratification as economists simultaneously sought to determine the cause to recommend proactive measures. Two presidents served during this time: Herbert Hoover (1929–1933), and Franklin D. Roosevelt (1933–1945). While Hoover primarily focused on budgetary concerns which inadvertently exacerbated the depression, Roosevelt\'s presidency marked a shift towards driven solutions. Recognizing the need for a novel approach, Roosevelt shifted his economic framework from budget balancing to a Keynesian platform because the New Deal and other interventionist methods were effective in stabilizing the economy; this paved the way for Roosevelt\'s lasting legacy and heightened presidential trust.',
      },
      {
        type: 'p',
        text: 'Before the depression hit, John Maynard Keynes (1883–1946), a British economist, was broadly concerned about the future of the US economy because of the excess of savings over investment. The Great Depression confirmed his unease. The imbalance in government savings and investment reduced demand, resulting in decreased consumer spending and investment in expansion and hiring. Consequently, this downturn in economic activity led to a rise in unemployment rates.',
      },
      {
        type: 'p',
        text: 'In a short essay, "Economic Possibilities for Our Grandchildren," published in a series of essays titled Essays In Persuasion, Keynes emphasized "the enormous anomaly of unemployment in a world full of wants" to be the largest problem for any economy. Here, Keynes underscored the paradox of unemployment despite widespread demand, revealing a disconnect between production potential and resource utilization. This discrepancy signaled an inefficient allocation of labor and capital, obstructing resource circulation. When the Great Depression hit, Keynes criticized Hoover\'s initial crisis-solving attempts, arguing in The General Theory that stimulating competition and implementing flexible pricing would not establish a self-regulating mechanism in the market consistent with what classical economists proposed. Instead, the latter and the former only provided temporary solutions to unemployment as issues such as demand deficiency and ineffective pricing mechanisms remained under examined. In lieu of these, Keynes posited interventionist strategies and advocated for deficit spending as a vehicle to drive economic growth.',
      },
      {
        type: 'p',
        text: 'Other economic theories persisted at the time as well: Keynesian ideology clashed with the widely accepted classical economics, which made it difficult for policymakers to adopt new Keynesian strategies. Classical economists based their claims on Say\'s Law. In that vein, they suggested that the supply of a product creates demand for another product given that that product has some value which can be exchanged for a new one. Applied to a time of economic decline, classical economists recommended no intervention because supply and consequently demand should adjust on its own. The most prominent figure to disapprove intervention was Austrian macroeconomist Friedrich Hayek, who argued that the cause of the Great Depression was not excess savings over investment; in fact, it was the opposite. This is further evident within his book Prices and Production, where he set himself up as the adversary of Keynes by advocating for the market to remain free. The tension here forced policymakers to navigate between conflicting ideologies. Further amplifying this tension were those in office who still adhered to classical economics—the theories that had guided economic policy over the previous decades—such as secretary Henry Morgenthau Jr. and much of the Treasury Department. They desired to balance the federal budget, as classical economists believed it would also enable the self-healing market mechanism. Due to numerous considerations and a tendency to lean on past successes, policymakers needed either tangible success or consistent failure of previous methods to effectively embrace the new Keynesian theory.',
      },
      {
        type: 'p',
        text: 'To secure the presidency, it was necessary for Roosevelt to market himself as a budget balancer. Roosevelt began his campaign through an address on the federal budget in Pennsylvania on October 19, 1932, embracing orthodox fiscal beliefs by promising to balance the federal budget when the national deficit was set at 3 billion dollars. Budget balancing—which Hoover himself failed to achieve—was well received by the US Treasury and the public, as indicated by polls where the majority voted against deficits. The familiarity of the budget balancing strategy that Roosevelt proposed helped instill confidence in consumers, business leaders, and investors, which he hoped would encourage investment and economic expansion. He also assumed that as the economy recovered, tax revenues would climb and a balanced budget would become more feasible. At the end of the day, budget balancing was unsuccessful because high unemployment rates persisted—between 1932 and 1935, one fifth of the nation was unemployed.',
      },
      {
        type: 'p',
        text: 'To combat these high unemployment rates, Roosevelt shifted towards existing intellectuals for novel approaches, including Keynes\'. In 1933, Keynes wrote a letter, published in the New York Times (NYT), to Roosevelt. In it, Keynes described Roosevelt\'s task to bring the nation out of recession as being twofold: reform and recovery. As recovery was time pressured, Keynes offered the following:',
      },
      {
        type: 'quote',
        text: 'The object of recovery is to increase the national output and put more men to work. … Individuals must be induced to spend more out of their existing incomes; or the business world must be induced … to create additional current incomes in the hands of their employees … or public authority must be called in aid to create additional current incomes through the expenditure of borrowed or printed money. In bad times the first factor cannot be expected to work…. The second…will come in as the second wave of attack on the slump after the tide has been turned by the expenditures of public authority. It is, therefore, only from the third…that we can expect the initial major impulse.',
      },
      {
        type: 'p',
        text: 'Keynes\' comprehensive list of options to achieve a specific goal, along with logical reasoning underscoring the reliability of each strategy, made his theory appear promising to Roosevelt. By specifying potential government investments, such as public works projects like railroad infrastructure, Keynes helped streamline Roosevelt\'s path to execution. These projects, he suggested, not only generated jobs but also enhanced efficiency, increasing consumer spending and stimulating economic activity. Altogether, Keynes believed that these interventionist efforts would enable material prosperity and restore faith in the government, two prospects Roosevelt valued as they would legitimize his presidency and improve the welfare of his citizens. While he kept the balanced budget in mind, he now recognized the need for a new perspective, and found Keynes\' solution of government expenditures to fix unemployment to be attractive. Within his Campaign Address at Forbes Field, Pittsburgh, Pennsylvania, on October 1, 1936, he stated: "we accepted the final responsibility of [the] Government, after all else had failed, to spend money when no one else had money left to spend." His acknowledgment of the necessity to initiate government spending aligned with Keynes\' interventionist recommendation.',
      },
      {
        type: 'p',
        text: 'Following Keynes\' advice, Roosevelt implemented interventionist strategies within the second phase of the New Deal Program to uplift the economy and improve the lives of employed people. In his initial NYT letter addressed to Roosevelt, Keynes critiqued the haste of the National Industrial Recovery Act, which intended to sanction fixed prices and wages, establish production quotas, and impose restrictions on company alliances. Banking on Keynes\' logic, between 1935 and 1938, Roosevelt revisited this impetuous act and reworked it to include two new central pieces of labor legislation aimed at improving labor welfare: the National Labor Relations Act (NLRA), which institutionalized collective bargaining and banned company unions, and the Fair Labor Standards Act (FLSA), which instituted a federal minimum wage and an overtime pay requirement, as well as a ban on child labor. In response, Keynes wrote a letter in early January 1938 to the president with approval of these new initiatives: "I regard the growth of collective bargaining as essential. I approve minimum wages and hours regulation." These programs achieved multiple objectives: increasing consumer spending, as people were compensated, which enabled them to spend more; improving worker productivity by ensuring fair wages which incentivized efficient work and improved overall productivity; and encouraging investment by instilling confidence among investors and businesses as stable labor conditions reduced investment risk and increased the likelihood of expansion, innovation, and hiring.',
      },
      {
        type: 'p',
        text: 'Beyond employed people, Roosevelt also developed a program for those unemployed that aligned with Keynes\' approval of government interventionist efforts, increasing social appreciation for Roosevelt among several segments of the public. Roosevelt introduced the Social Security Act (SSA) which helped all those unemployed—both those by choice and those by force. Within this act contained a federal old-age pension plan and an unemployment insurance system. These two components aimed to stimulate economic growth—having these safety nets allowed consumers to spend even in an economic downturn. This system helped stabilize household incomes and maintain consumer spending levels. The decreasing unemployment rates and increased consumer spending between 1933 and 1937 proved the success of these programs. These results, however, did not make Roosevelt completely dependent on the new programs to the extent where he would abandon his old budget balancing ambition.',
      },
      {
        type: 'p',
        text: 'As the economy began to stabilize, Roosevelt reverted to his budget balancing mission; however, these strategies reversed the economic progress made and risked the economy into a deeper recession. After levels of unemployment decreased in part to these new programs from 25% to 14% between 1933 and 1937, Roosevelt returned to his original promise and tried traditional fiscal policies to balance the budget. To do so, he had to reduce emergency relief and public works spending. These policies had adverse effects: instead of helping the economy return back to pre-depression levels, they only exacerbated economic conditions, plunging the country back into a recession—coined "Roosevelt Recession of 1937–1938"—to the point where people were concerned that the Roosevelt administration\'s approach toward business was delaying economic recovery by a significant margin, as indicated by The Gallup Organization poll. The name alone threatened Roosevelt\'s legitimacy and forced him to abandon the budget balancing goal because it did not achieve a positive outcome. This experience made Roosevelt realize the extent to which Keynesian theory genuinely worked.',
      },
      {
        type: 'p',
        text: 'Bolstered by the success of the New Deal programs supported by Keynes and the failure of the budget balancing, Roosevelt transitioned to utilizing expenditure to combat high unemployment rates for long-term employment stability. In Keynes\' book, The General Theory, he recommended that "in a state of semi-slump, with the economy in a liquidity trap," government expenditure can kick start investment—as investment drove spending on capital goods, that in turn boosted the production of consumer goods which lead to a broader stream of spending overall. Keynes elucidated the importance of the government providence of an investment impetus as "the duty of rendering the current volume of investment cannot safely be left in private hands." Extrapolating these ideas and penning a letter to Roosevelt in February 1938, Keynes declared that "[Roosevelt] must either give more encouragement to business or take over more of their functions yourself." Roosevelt accepted this argument. In April 1938, he proposed to congress a "new" federal expenditure of $1.5 billion for public works. The success of this expenditure can be analyzed through the unemployment rates. While reaching a record high in June of 1938—this peak can be attributed to the fiscal policies and budget balancing attempts. Soon thereafter, switching back over to the Keynesian-powered strategies resulted in a dramatic decrease in the unemployment rate by 4% in six months. Roosevelt\'s swift execution of an interventionist plan proved effective.',
      },
      {
        type: 'p',
        text: 'Both the theories and consistent communication provided by Keynes were necessary but insufficient in pushing Roosevelt to enact new policies; public approval was also required. Roosevelt prioritized public perception to secure his presidency long-term so that he could pass beneficial reforms. By carrying out small public works projects through the New Deal program, he generated excitement among the populace. This increased public backing provided Roosevelt with the latitude to pursue more ambitious endeavors. In spite of the public\'s initial aversion to government spending, Roosevelt recognized the necessity of prioritizing such expenditures to alleviate economic hardship. This strategic decision, although perceived as risky, ultimately proved fruitful as it consistently contributed to a decrease in the unemployment rate within the timespan of his presidency. Roosevelt\'s electoral victories illustrated growing public endorsement. He won his first election with 52.6% of the vote, increasing to 56.9% and 58.8% in his second and third elections respectively. These widening margins underscored the increasing support for his leadership over time despite his unconventional strategies.',
      },
      {
        type: 'p',
        text: 'Roosevelt left a lasting legacy by effectively pulling the US out of the worst recession to date. Even today, politicians strive to continue his legacy, as seen in President Joe Biden\'s Infrastructure Investment and Jobs Act (IIJA), which intends to revitalize the economy through substantial government spending on infrastructure projects. Through the IIJA, Biden hopes to allocate funds towards various sectors such as transportation, water systems, broadband expansion, and clean energy initiatives, aiming to create jobs and stimulate economic growth—much like Roosevelt through his New Deal programs. However, unlike the 1930s, where benefits swiftly materialized, there are currently no immediate indicators due to the absence of a recession. This theoretically would lead to poor public perception, as people may be skeptical of the significant government expenditure without seeing immediate results. Yet, Biden need not worry over public perception as Roosevelt\'s presidency has ingrained the understanding that innovation is at times imperative, curtailing concerns about presidential legitimacy. Roosevelt\'s pioneering departure from conventional policies laid a foundation for subsequent presidents to navigate public opinion with greater ease, reflecting his enduring influence.',
      },
    ],
    sources: [
      '"FDR: From Budget Balancer to Keynesian." Franklin D. Roosevelt Presidential Library and Museum.',
      'Hayek, Friedrich A. von, Toby Baxendale, and Joe Salerno. Prices and Production and Other Works: F.A. Hayek on Money, the Business Cycle, and the Gold Standard. Auburn, Ala.: Ludwig von Mises Institute, 2008.',
      'Kaufman, Bruce E. "Wage Theory, New Deal Labor Policy, and the Great Depression: Were Government and Unions to Blame?" Industrial and Labor Relations Review 65, no. 3 (2012): 501–32.',
      'Keynes, John Maynard. Essays in Persuasion. New York: W.W. Norton & Co., 1963.',
      'Keynes, John Maynard. Letter to Franklin Delano Roosevelt, "An Open Letter to President Roosevelt," December 31, 1933.',
      'Keynes, John Maynard. The General Theory of Employment, Interest, and Money. New York, NY: Harcourt, 2015.',
      'Labor Force Statistics from the Current Population Survey (SIC). Bureau of Labor Statistics (BLS), n.d.',
      'Levy, Jonathan. Ages of American Capitalism: A History of the United States. New York: Random House, 2021.',
      '"Modern Economy 1919-1930." California State University, Northridge.',
      'National Bureau of Economic Research, Unemployment Rate for United States [M0892AUSM156SNBR], retrieved from FRED, Federal Reserve Bank of St. Louis.',
      '"National Industrial Recovery Act (1933)." National Archives. Last modified February 8, 2022.',
      'Reed, Lawrence W. Great Myths of the Great Depression. Mackinac Center for Public Policy, 1981.',
      'Say, Jean Baptiste, Munir Quddus, and Salim Rashid. A Treatise on Political Economy. Abingdon, Oxon: Routledge, 2017.',
      'Tomer, Adie. "At its two-year anniversary, the bipartisan infrastructure law continues to rebuild all of America." Brookings. Last modified November 15, 2023.',
      '"Voter Turnout in Presidential Elections." Table. The American Presidency Project.',
      'Wapshott, Nicholas. Keynes Hayek: The Clash That Defined Modern Economics. New York, NY: W.W. Norton & Company, 2012.',
    ],
  },
]
