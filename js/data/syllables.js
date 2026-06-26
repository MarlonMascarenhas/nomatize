/**
 * syllables.js — Banco de sílabas organizadas por origem linguística.
 * 
 * Cada sílaba segue padrões fonotáticos naturais:
 *   V  = vogal
 *   CV = consoante + vogal  (mais comum)
 *   VC = vogal + consoante
 *   CVC = consoante + vogal + consoante
 *   CCV = consoante + consoante + vogal
 * 
 * O gerador combinatório usa estas sílabas para criar nomes
 * realistas, seguindo regras de cada origem.
 */

export const Syllables = {
  /** Origem Latina / Romance (português, espanhol, italiano) */
  latin: {
    onset: ['b','br','c','cr','d','f','fl','g','gr','l','m','n','p','pr','qu','r','s','st','t','tr','v'],
    nucleus: ['a','e','i','o','u','ã','ão','ei','ai','ou','ia','ie','io'],
    coda: ['l','r','s','m','n','z'],
    patterns: [
      { start: 'CV', mid: 'CV', end: 'CV' },
      { start: 'CV', mid: 'CVC', end: 'CV' },
      { start: 'V', mid: 'CV', end: 'CV' },
      { start: 'CV', mid: 'CV', end: 'CVC' },
      { start: 'CVC', mid: 'CV', end: 'CV' },
      { start: 'CV', mid: 'CCV', end: 'CV' },
      { start: 'V', mid: 'CVC', end: 'CV' },
      { start: 'CV', mid: 'CV', end: 'V' },
    ],
    suffixes: ['o','a','e','io','ia','us','is','inho','inha','ino'],
    prefixes: ['a','al','an','ar','be','bo','ca','ce','ci','co','de','di','en','es','fa','fe','fi','fo','ga','ge','gi','gua','la','le','li','lo','ma','me','mi','mo','mu','na','ne','ni','no','pa','pe','pi','po','ra','re','ri','ro','sa','se','si','so','ta','te','ti','to','tu','va','ve','vi'],
  },

  /** Origem Germânica (alemão, inglês antigo, nórdico) */
  germanic: {
    onset: ['b','br','d','dr','f','fr','g','gr','h','j','k','kr','l','m','n','r','s','sk','sl','st','t','tr','v','w','þ'],
    nucleus: ['a','e','i','o','u','æ','ei','ai','ou','ie','eo','ea'],
    coda: ['l','r','s','n','k','t','d','f','þ','ld','nd','rd','st','rk'],
    patterns: [
      { start: 'CV', mid: 'CVC', end: 'CVC' },
      { start: 'CVC', mid: 'CV', end: 'CVC' },
      { start: 'CV', mid: 'CV', end: 'CVC' },
      { start: 'CV', mid: 'CCVC', end: 'CV' },
      { start: 'CCV', mid: 'CVC', end: 'CV' },
    ],
    suffixes: ['o','a','e','us','er','el','en','ar','mund','berto','berto','ilda','gard','trude'],
    prefixes: ['al','ad','bal','ber','bran','brun','clod','con','dan','ed','el','er','frid','gar','ger','god','gon','gun','hal','har','hel','her','hil','hug','hun','ing','ir','lan','lei','lod','lud','man','nor','od','os','ra','rad','rei','ric','rod','ros','rud','sig','tan','teo','teu','theo','tor','tru','ul','val','wal','wan','wer','wil','win','wolf'],
  },

  /** Origem Hebraica / Bíblica */
  hebrew: {
    onset: ['','b','d','el','g','h','i','j','m','n','r','sh','t','y','z','ch','eh','ah'],
    nucleus: ['a','e','i','o','u','a','e','i','a','e','i'],
    coda: ['el','ah','on','im','am','em','om','an','i','u','ai'],
    patterns: [
      { start: 'V', mid: 'CV', end: 'VC' },
      { start: 'CV', mid: 'CV', end: 'VC' },
      { start: 'CV', mid: 'CVC', end: 'V' },
      { start: 'VC', mid: 'CV', end: 'VC' },
      { start: 'CV', mid: 'CV', end: 'V' },
    ],
    suffixes: ['el','ah','on','im','ai','i','á','ias','ias','iel'],
    prefixes: ['ab','ad','ah','am','an','az','ben','beth','bo','dan','deb','dor','eb','ed','el','eli','em','en','er','es','eth','eu','eze','ga','gab','ged','ge','gil','ha','han','has','he','her','hes','hez','hi','hil','his','hod','ho','hos','i','iah','ian','id','im','is','ish','iz','ja','jab','jah','jak','jas','je','jed','jeph','jer','jes','jeth','jo','job','joel','jon','josh','jos','joth','la','lab','lech','leh','le','lev','li','lo','lu','ma','mac','mal','man','mar','mat','me','mel','mi','mich','mo','mor','na','nah','nan','nap','nath','ne','neh','ne','ni','no','ob','om','on','or','os','pha','phi','pho','ra','rab','rah','ram','ran','raph','reb','rech','re','ri','rib','rim','rob','rog','ru','ruf','sa','sad','sal','sam','samu','sap','sar','se','seb','sha','shad','shal','sham','shap','she','shim','sho','shu','si','sih','sim','si','so','sol','su','ta','tab','tal','tam','tan','tap','tar','te','teb','te','ti','tig','tir','to','tob','to','tri','tu','u','ur','u','uz','za','zab','zad','zah','zam','zap','zar','ze','zeb','zech','zed','ze','zep','zer','zi','zil','zim','zip','zo','zoph','zu'],
  },

  /** Origem Grega */
  greek: {
    onset: ['','b','br','c','chr','d','dr','g','gl','gn','h','k','l','m','n','p','ph','ps','r','s','st','str','t','th','tr','x','z'],
    nucleus: ['a','e','i','o','u','eu','oi','ai','au','ou','ia','io'],
    coda: ['s','n','r','l','x','m','k','t'],
    patterns: [
      { start: 'CV', mid: 'CV', end: 'CVC' },
      { start: 'CCV', mid: 'CV', end: 'CVC' },
      { start: 'CV', mid: 'CCV', end: 'CV' },
      { start: 'V', mid: 'CV', end: 'CVC' },
      { start: 'CV', mid: 'CVC', end: 'CVC' },
    ],
    suffixes: ['o','a','e','es','is','os','as','on','us','ia','io','eus','eu','ias'],
    prefixes: ['a','acro','aes','ag','alex','amphi','ana','andro','anemo','antho','anti','apei','apo','ar','archae','aristo','arto','astro','atlas','auto','bapt','bar','basil','biblio','bio','botan','cac','cal','calli','car','cata','ceno','cephal','chrom','chron','chrys','cin','circ','cleo','clio','coe','cosmo','crat','cryp','cycl','cyn','cyst','demo','derm','di','dia','dif','din','diplo','dodeca','dox','dynam','dys','ec','eco','ec','el','electro','em','en','ephal','epi','epis','er','erg','eryth','esthes','eth','ethn','etio','eu','ex','exo','extra','gamy','gaster','gen','geo','ger','giga','gin','gno','gon','gor','gorg','grad','graph','gym','gyn','gyr','hagi','hal','haplo','hecto','heli','hel','hem','hemi','hepa','hept','her','herm','hesper','hetero','hex','hipp','histo','holo','homo','hor','hor','hydr','hygro','hyl','hym','hyper','hypn','hypo','hyster','iatri','ichthy','icon','icosa','idio','ig','ign','in','ir','iso','is','ischi','isch','ite','kai','kal','kata','kilo','kin','labi','lach','lacrim','lal','lapar','laryng','later','lati','lecith','leio','lepid','lepto','leuc','ling','lip','lith','log','lumin','ly','lymph','lys','macr','magn','mega','mel','melan','meli','men','mening','mer','mes','meta','meter','metr','micr','miso','mito','mne','mono','morph','mus','my','myc','myel','myo','myri','myx','narc','nas','necr','nemat','neo','nephr','neur','neutr','nigr','nitr','noct','nom','non','nos','not','noth','nucle','nyct','ob','o','oc','oct','od','od','odyn','oestr','ole','olig','om','ombr','omo','omphal','on','onym','oo','ophi','ophthalm','opisth','opt','or','or','orch','ornith','oro','orth','osc','osphy','oss','ost','oste','ot','ov','oxy','pachy','paleo','pan','pant','par','para','path','patr','ped','pel','pelv','pen','pent','pep','per','peri','petr','pha','phag','phaner','pharmac','pharyng','phen','pher','phil','phleb','phleg','phlog','phob','phon','phor','phot','phren','phry','phthor','phyl','phys','phyt','pisc','plan','plasm','platy','ple','pleur','plut','pneu','pod','poi','pol','poly','pont','por','pos','potam','prasin','prat','pre','presby','pro','proct','prot','proto','pseud','psych','pter','pteryg','ptos','pulm','pyr','pyret','quadr','radi','re','rect','ren','reti','rhin','rhiz','rhod','rhomb','rhyth','ro','rubr','sacchar','sacr','sapr','sarc','saur','scaph','schis','schiz','sci','scir','scol','scop','scyph','se','selen','sem','semi','sial','sider','sigm','sin','sin','siphon','somat','somn','son','soph','spec','spermat','spher','sphen','spir','spiro','splanchn','splen','spondyl','spor','staph','stat','steat','sten','stere','steth','sthen','stom','strat','streph','strept','stroph','styl','sub','super','supra','sy','sym','syn','tachy','taut','tax','techn','tele','teleo','ten','tend','tens','ter','ter','terat','tetra','thalass','thanat','the','theo','therap','therm','thes','thio','thorac','thromb','thyreo','toc','tom','ton','top','tox','trache','trachel','trans','tri','trich','trit','trop','troph','tryp','tuber','tympan','typh','tyr','ultra','umbil','un','unci','uri','uro','vac','vagin','valv','varic','vas','vel','vel','ven','ventr','verm','vers','vertebr','vesic','viscer','vit','vitr','viv','vulv','xanth','xen','xer','yl','zoo','zym'],
  },

  /** Origem Nórdica / Escandinava */
  norse: {
    onset: ['b','br','d','dr','f','fr','g','gr','h','hj','hv','j','k','kr','l','m','n','r','s','sk','sl','st','sv','t','tr','v','þ'],
    nucleus: ['a','e','i','o','u','y','æ','ö','ei','ey','au','ja','jö'],
    coda: ['l','r','s','n','k','t','d','m','nd','ld','rd','rn','rn','rr'],
    patterns: [
      { start: 'CV', mid: 'CV', end: 'CVC' },
      { start: 'CVC', mid: 'CV', end: 'CVC' },
      { start: 'CCV', mid: 'CVC', end: 'CV' },
      { start: 'CV', mid: 'CCVC', end: 'CVC' },
      { start: 'CV', mid: 'CVC', end: 'CCVC' },
    ],
    suffixes: ['o','a','e','ir','ar','ur','son','sen','dottir','berg','fjord','heim','vik'],
    prefixes: ['al','ar','as','ast','björn','bor','brand','dag','ei','ein','finn','folk','fri','gunn','hag','hal','har','hav','hed','hel','her','hjör','ing','ivar','jarl','jörm','karl','kel','kel','ket','knut','kol','lars','leif','lod','mag','magn','njör','nor','od','ol','or','os','rag','ran','rei','rik','ring','rod','run','sig','sind','sjö','sol','sten','stig','sven','sver','tek','tor','tryg','tuv','tyr','ulf','un','val','ven','vid','vig','vil','vor','yng','yr'],
  },

  /** Origem Eslava */
  slavic: {
    onset: ['b','bl','br','c','č','d','dr','g','h','j','k','kr','l','m','n','p','pl','pr','r','s','sl','sv','š','t','tr','v','vl','vr','z','ž'],
    nucleus: ['a','e','i','o','u','y','ja','je','jo','ju'],
    coda: ['l','r','s','n','k','t','v','m','d','st','sk','v'],
    patterns: [
      { start: 'CV', mid: 'CV', end: 'CV' },
      { start: 'CV', mid: 'CVC', end: 'CV' },
      { start: 'CCV', mid: 'CV', end: 'CVC' },
      { start: 'CV', mid: 'CCV', end: 'CVC' },
    ],
    suffixes: ['o','a','e','ov','ev','in','ina','ić','ovich','evna','mir','slav','bor','vlad'],
    prefixes: ['boh','boj','bor','brani','budi','cas','ceti','cido','cvit','čedo','čest','dobro','drago','dragu','drugo','duš','gosti','goj','gord','gradi','grom','hrani','hvali','iz','jaro','kaz','krasi','ljub','ljude','lju','malo','mato','mil','mir','miri','mla','most','msti','mysli','nadi','nasta','nede','nego','ne','ognje','pazi','pěni','pěro','plamen','plamě','pola','poli','polo','pota','pravi','pravo','prěby','prěby','prěby','prěja','prěja','prěja','primi','prosi','proti','puti','radi','rado','rano','rasi','rati','rodi','rogo','rosti','samo','sądi','sądi','sę','sla','sladi','slano','slati','slavo','slě','sli','sme','smet','smi','smo','snag','sobi','soko','spase','spi','spori','srado','srano','srdi','srě','sri','sri','stali','stani','stano','stari','stasi','stati','stavi','stoi','stoj','stoni','stori','stra','stra','stra','strani','strei','strei','streli','studi','stvori','sudi','sulo','svo','sveti','svie','svie','svieti','svit','tai','tai','tai','taji','tako','tali','tamo','tani','tapi','tati','tato','tazi','teci','teli','telo','teni','tepi','teri','tesi','tesli','teti','tezi','tihi','tili','tiri','tisi','titi','tivi','tizi','tomi','topi','tori','toro','tosi','toti','tozi','tra','tra','tra','trag','tran','trap','tras','trat','trav','tre','tre','tre','trem','tres','tret','trev','tri','tri','tri','trim','trin','tris','trit','triv','tro','tro','tro','trom','tron','trop','tros','trot','trov','tru','tru','tru','trum','trun','trus','trut','truz','tu','tu','tu','tud','tuj','tuk','tul','tum','tun','tup','tur','tus','tut','tuz','tvu','tvu','tvu','tvur','tvy','tvy','tvy','ty','ty','ty','tyk','tyl','tym','tyn','typ','tyr','tys','tyt','tyz','tza','tza','tza','tzar','tze','tze','tze','tzem','tzen','tzer','tzes','tzet','tzev','tzi','tzi','tzi','tzim','tzin','tzir','tzis','tzit','tziv','tzo','tzo','tzo','tzom','tzon','tzop','tzos','tzot','tzov','tzu','tzu','tzu','tzum','tzun','tzur','tzus','tzut','tzuz','u','u','u','ube','ubi','ubl','ubr','ubu','uby','uci','ucl','ucr','ucu','ucy','uda','udi','udl','udr','udu','udy','ufa','ufe','ufi','ufl','ufr','ufu','ufy','uga','ugi','ugl','ugr','ugu','ugy','uha','uhe','uhi','uhl','uhr','uhu','uhy','uja','uje','uji','ujl','ujr','uju','ujy','uka','uke','uki','ukl','ukr','uku','uky','ula','ule','uli','ull','ulr','ulu','uly','uma','ume','umi','uml','umr','umu','umy','una','une','uni','unl','unr','unu','uny','upa','upe','upi','upl','upr','upu','upy','ura','ure','uri','url','urr','uru','ury','usa','use','usi','usl','usr','usu','usy','uta','ute','uti','utl','utr','utu','uty','uva','uve','uvi','uvl','uvr','uvu','uvy','uza','uze','uzi','uzl','uzr','uzu','uzy','va','va','va','vad','vah','vaj','vak','val','vam','van','vap','var','vas','vat','vav','vaz','ve','ve','ve','ved','veh','vej','vek','vel','vem','ven','vep','ver','ves','vet','vev','vez','vi','vi','vi','vid','vih','vij','vik','vil','vim','vin','vip','vir','vis','vit','viv','viz','vla','vla','vla','vlad','vlah','vlaj','vlak','vlam','vlan','vlap','vlar','vlas','vlat','vlav','vlaz','vle','vle','vle','vled','vleh','vlej','vlek','vlem','vlen','vlep','vler','vles','vlet','vlev','vlez','vli','vli','vli','vlid','vlih','vlij','vlik','vlim','vlin','vlip','vlir','vlis','vlit','vliv','vliz','vlo','vlo','vlo','vlod','vloh','vloj','vlok','vlom','vlon','vlop','vlor','vlos','vlot','vlov','vloz','vlu','vlu','vlu','vlud','vluh','vluj','vluk','vlum','vlun','vlup','vlur','vlus','vlut','vluv','vluz','vly','vly','vly','vlyd','vlyh','vlyj','vlyk','vlym','vlyn','vlyp','vlyr','vlys','vlyt','vlyv','vlyz','vo','vo','vo','vod','voh','voj','vok','vol','vom','von','vop','vor','vos','vot','vov','voz','vu','vu','vu','vud','vuh','vuj','vuk','vul','vum','vun','vup','vur','vus','vut','vuv','vuz','vy','vy','vy','vyd','vyh','vyj','vyk','vyl','vym','vyn','vyp','vyr','vys','vyt','vyv','vyz'],
  },

  /** Origem Céltica */
  celtic: {
    onset: ['b','br','c','d','dr','f','g','gl','gr','gw','l','m','n','p','r','s','t','tr','w'],
    nucleus: ['a','e','i','o','u','ae','oe','eu','ai','ei','ia','io'],
    coda: ['l','r','s','n','ch','th','gh','m','ll','nn'],
    patterns: [
      { start: 'CV', mid: 'CVC', end: 'CV' },
      { start: 'CV', mid: 'CV', end: 'CVC' },
      { start: 'CCV', mid: 'CV', end: 'CV' },
      { start: 'CV', mid: 'CCV', end: 'CVC' },
    ],
    suffixes: ['a','e','an','en','on','os','us','ix','orix','gen','mor','wyn'],
    prefixes: ['aed','aer','arg','art','bal','barr','bran','bre','bri','bryn','cad','caer','car','cass','ce','cern','cun','dag','der','don','dun','dy','elyn','elyn','finn','gla','glas','glyn','gwen','gwyn','ian','idris','ker','kyn','lan','llyr','llyn','lor','lugh','mab','mad','mag','mal','morgan','mor','my','nwy','nym','pen','pryd','pry','rhian','rhod','se','sil','tal','taran','teyr','ur','wyn','ys'],
  },

  /** Origem Árabe / Muçulmana */
  arabic: {
    onset: ['','b','d','f','h','j','k','l','m','n','q','r','s','sh','t','th','w','y','z','gh','kh'],
    nucleus: ['a','i','u','ā','ī','ū','ay','aw','a','i','u'],
    coda: ['d','l','m','n','r','s','t','b','f','q','h'],
    patterns: [
      { start: 'CV', mid: 'CVC', end: 'VC' },
      { start: 'CV', mid: 'CV', end: 'CVC' },
      { start: 'V', mid: 'CVC', end: 'CV' },
      { start: 'CVC', mid: 'CV', end: 'CVC' },
    ],
    suffixes: ['ullah','allah','din','uddin','ul','al','an','i','iyya','iya','at'],
    prefixes: ['ab','abd','abu','ah','ahm','al','am','amin','amir','an','as','ashraf','ay','aziz','badr','bah','baha','bakr','bar','bas','bash','bil','bishr','bur','bush','da','dab','dah','dakh','dal','dam','dan','daq','dar','daw','day','dha','dhab','dhah','dhak','dhal','dham','dhan','dhaq','dhar','dhaw','dhay','dhi','dhib','dhih','dhik','dhim','dhin','dhiq','dhir','dhis','dhit','dhiw','dhiy','dhu','dhub','dhuh','dhuk','dhul','dhum','dhun','dhug','dhur','dhus','dhut','dhuw','dhuy','di','dib','did','dif','dij','dik','dil','dim','din','diq','dir','dis','dit','diw','diy','du','dub','dud','duf','duj','duk','dul','dum','dun','duq','dur','dus','dut','duw','duy','fa','fab','fad','fah','faj','fak','fal','fam','fan','fag','far','fas','fat','faw','fay','fe','feb','fed','feh','fej','fek','fel','fem','fen','feg','fer','fes','fet','few','fey','fi','fib','fid','fif','fij','fik','fil','fim','fin','fig','fir','fis','fit','fiw','fiy','fu','fub','fud','fuf','fuj','fuk','ful','fum','fun','fug','fur','fus','fut','fuw','fuy','ga','gab','gad','gah','gaj','gak','gal','gam','gan','gaq','gar','gas','gat','gaw','gay','gha','ghab','ghad','ghah','ghaj','ghak','ghal','gham','ghan','ghaq','ghar','ghas','ghat','ghaw','ghay','ghi','ghib','ghid','ghif','ghij','ghik','ghil','ghim','ghin','ghiq','ghir','ghis','ghit','ghiw','ghiy','ghu','ghub','ghud','ghuf','ghuj','ghuk','ghul','ghum','ghun','ghuq','ghur','ghus','ghut','ghuw','ghuy','ha','hab','had','haf','haj','hak','hal','ham','han','haq','har','has','hat','haw','hay','hi','hib','hid','hif','hij','hik','hil','him','hin','hiq','hir','his','hit','hiw','hiy','hu','hub','hud','huf','huj','huk','hul','hum','hun','huq','hur','hus','hut','huw','huy','i','ib','id','if','ij','ik','il','im','in','iq','ir','is','it','iw','iy','ja','jab','jad','jah','jaj','jak','jal','jam','jan','jaq','jar','jas','jat','jaw','jay','ji','jib','jid','jif','jij','jik','jil','jim','jin','jiq','jir','jis','jit','jiw','jiy','ju','jub','jud','juf','juj','juk','jul','jum','jun','juq','jur','jus','jut','juw','juy','ka','kab','kad','kah','kaj','kak','kal','kam','kan','kaq','kar','kas','kat','kaw','kay','kha','khab','khad','khah','khaj','khak','khal','kham','khan','khaq','khar','khas','khat','khaw','khay','khi','khib','khid','khif','khij','khik','khil','khim','khin','khiq','khir','khis','khit','khiw','khiy','khu','khub','khud','khuf','khuj','khuk','khul','khum','khun','khuq','khur','khus','khut','khuw','khuy','ki','kib','kid','kif','kij','kik','kil','kim','kin','kiq','kir','kis','kit','kiw','kiy','ku','kub','kud','kuf','kuj','kuk','kul','kum','kun','kuq','kur','kus','kut','kuw','kuy','la','lab','lad','lah','laj','lak','lal','lam','lan','laq','lar','las','lat','law','lay','li','lib','lid','lif','lij','lik','lil','lim','lin','liq','lir','lis','lit','liw','liy','lu','lub','lud','luf','luj','luk','lul','lum','lun','luq','lur','lus','lut','luw','luy','ma','mab','mad','mah','maj','mak','mal','mam','man','maq','mar','mas','mat','maw','may','mi','mib','mid','mif','mij','mik','mil','mim','min','miq','mir','mis','mit','miw','miy','mu','mub','mud','muf','muj','muk','mul','mum','mun','muq','mur','mus','mut','muw','muy','na','nab','nad','nah','naj','nak','nal','nam','nan','naq','nar','nas','nat','naw','nay','ni','nib','nid','nif','nij','nik','nil','nim','nin','niq','nir','nis','nit','niw','niy','nu','nub','nud','nuf','nuj','nuk','nul','num','nun','nuq','nur','nus','nut','nuw','nuy','qa','qab','qad','qah','qaj','qak','qal','qam','qan','qaq','qar','qas','qat','qaw','qay','qi','qib','qid','qif','qij','qik','qil','qim','qin','qiq','qir','qis','qit','qiw','qiy','qu','qub','qud','quf','quj','quk','qul','qum','qun','quq','qur','qus','qut','quw','quy','ra','rab','rad','rah','raj','rak','ral','ram','ran','raq','rar','ras','rat','raw','ray','ri','rib','rid','rif','rij','rik','ril','rim','rin','riq','rir','ris','rit','riw','riy','ru','rub','rud','ruf','ruj','ruk','rul','rum','run','ruq','rur','rus','rut','ruw','ruy'],
  },

  /** Origem Japonesa */
  japanese: {
    onset: ['','k','s','t','n','h','m','y','r','w','g','z','d','b','p','ky','sh','ch','ny','hy','my','ry','gy','j','by','py'],
    nucleus: ['a','i','u','e','o','a','i','u','e','o'],
    coda: ['n','n','n','n'],
    patterns: [
      { start: 'CV', mid: 'CV', end: 'CV' },
      { start: 'CV', mid: 'CV', end: 'CVN' },
      { start: 'CVN', mid: 'CV', end: 'CV' },
      { start: 'CV', mid: 'CCV', end: 'CV' },
    ],
    suffixes: ['o','a','i','e','ko','suke','hiko','maru','mi','ro','ji','ta','no','to','ki'],
    prefixes: ['a','aka','aki','ama','ami','ao','asa','aya','ben','bot','cho','dai','emi','ena','eri','etsu','fuji','fumi','goto','hana','haru','hide','hika','hiko','hiro','hisashi','hito','hoka','hoko','hono','hotaru','ichi','iku','isa','isamu','ishi','itsuki','izumi','jin','jun','kage','kai','kaku','kami','kan','kana','kao','katsu','kazu','kei','ken','kengo','kenji','kenta','ki','kichi','kiku','kim','kimi','kin','kiri','kisa','kiyo','kohaku','koi','koji','koku','kome','koto','kuma','kuni','kura','kuro','kyo','machi','mako','mami','mana','manabu','maru','masa','masami','masao','masaru','masashi','masato','masumi','matsu','maya','mayu','michi','midori','mika','miki','miku','mimi','mina','mino','minoru','mio','misa','mitsuki','miwa','miyabi','miyu','mizu','moegi','momo','mori','moto','munenori','mura','mutsu','nagisa','nami','nana','nanao','natsu','natsuki','neko','nikko','noboru','nobu','nobuo','noriko','noshi','nosuke','obi','ocha','oharu','oji','oka','okami','oki','okira','oku','omi','omitsu','omizu','omoto','omura','onami','one','oni','onishi','onsen','onuma','ooki','oori','oota','oppama','ora','orenji','ori','oriko','oru','osamu','osen','oshi','oshima','osu','ota','otama','otani','otoko','otome','otoshi','otsu','ouchi','ouen','ougi','ouka','oumi','ouno','oushi','outa','ouzu','owa','oya','oyama','ozaki','ozawa','ozono','raku','ran','rei','ren','ri','riki','rin','risa','roku','ronin','rosa','ryo','ryota','ryu','sachi','sada','sae','sakae','saki','saku','sakura','sama','sana','sango','sani','sano','sara','sari','saru','sasa','sato','satsu','sawa','sei','seiji','seiko','seiya','seki','semi','sen','senji','senko','senri','setsu','setsuko','shiba','shido','shige','shigenori','shigeru','shika','shiki','shima','shin','shingo','shinji','shinobu','shiori','shiro','shizu','sho','shoichi','shoji','shoko','shoma','shu','shuhei','shun','shunji','shunpei','shusuke','so','soji','sora','soshi','sota','suke','suki','sumi','sumire','sushi','suzu','tabi','tada','tadahiro','tadashi','taichi','taiga','taiki','taizo','taji','taka','takako','takane','takara','takashi','takato','takayuki','take','takenori','takeshi','taki','takumi','tama','tamaki','tamiko','tamotsu','tamu','tana','tanaka','tani','tanuki','tao','tara','taro','taru','tatsu','tatsuo','tatsuro','tatsuya','tayo','tazuko','tei','teiji','teiko','teishi','teito','teiwa','teko','temi','ten','tenma','tenni','tenno','tento','teo','teru','teruko','teruo','tetsu','tetsuo','tetsuya','tetsuzo','tofu','togo','tojo','toki','tokiko','tokio','tokuji','tokuma','tokuo','tokyo','tomi','tomiko','tomio','tomita','tomo','tomoe','tomoko','tomomi','tomoo','tomoya','tomoyo','ton','tora','toraji','tori','toru','toshi','toshiko','toshio','toshiro','toshiya','tosho','toto','toto','toyo','toyoko','toyoo','toyota','tsubame','tsubasa','tsuchi','tsugumi','tsui','tsuji','tsukasa','tsuki','tsukiko','tsukino','tsukuru','tsuma','tsune','tsuneko','tsuneo','tsuru','tsurugi','tsutomu','tsuyoshi','u','uchi','ue','ueda','ueno','uesugi','uichi','uji','ukyo','ume','umeko','umi','umiko','uno','ura','uran','uri','urumi','usa','usagi','ushi','ushio','uta','utada','utagawa','utaka','utako','utano','utao','uto','utsumi','uwa','uzuki','waka','wakaba','wakako','wakana','wakaru','waki','wako','wami','wani','wano','wara','wari','waro','wasabi','washi','wataru','watashi','watatsu','wayo','waza','yachi','yada','yagi','yagura','yahata','yahiko','yahiro','yaji','yajima','yaju','yaka','yakata','yaki','yakko','yako','yakumo','yama','yamabuki','yamada','yamagata','yamagoshi','yamaji','yamakawa','yamaki','yamako','yamamoto','yamamura','yamana','yamane','yamani','yamano','yamaoka','yamasaki','yamashiro','yamashita','yamato','yamaura','yamawaki','yamazaki','yame','yami','yamoto','yamu','yanagi','yanagida','yanase','yano','yao','yaoi','yaoki','yari','yaru','yasa','yasai','yasashi','yase','yashiro','yashita','yasuda','yasufumi','yasuhiro','yasukawa','yasuko','yasumasa','yasumi','yasunaga','yasuo','yasushi','yasuyo','yasuyuki','yata','yatagai','yatate','yato','yatsu','yatsude','yayoi','yayo','yazu','yo','yoichi','yoji','yoko','yokota','yomi','yomo','yon','yone','yoneko','yoneshi','yoneyama','yori','yoriko','yorio','yoritomo','yoro','yoru','yosa','yoshi','yoshida','yoshie','yoshifumi','yoshihiro','yoshikazu','yoshiko','yoshimasa','yoshimi','yoshimitsu','yoshinaga','yoshinobu','yoshio','yoshiro','yoshito','yoshiyuki','yosuke','yota','yotaka','yotaro','yotsuba','you','youhei','youichi','youji','youko','yozora','yu','yua','yube','yuchi','yudai','yue','yuga','yugen','yugo','yui','yuichi','yuiji','yuji','yujin','yuka','yukari','yuki','yukie','yukihiro','yukiko','yukimasa','yukio','yukito','yukiyo','yukiyoshi','yuko','yukoni','yukue','yukuri','yuma','yumi','yumiko','yuna','yunishi','yuno','yunosuke','yura','yuri','yuriko','yurino','yuru','yusa','yusaku','yusei','yushi','yusuke','yuta','yutaka','yuto','yuu','yuudai','yuuga','yuugo','yuuhi','yuui','yuuji','yuuka','yuuki','yuuma','yuuna','yuuri','yuusuke','yuuta','yuuya','yuya','yuzo','yuzuki','yuzuru'],
  },

  /** Origem Tupi / Indígena Brasileira */
  tupi: {
    onset: ['','b','c','d','g','i','j','m','n','p','r','s','t','u','x','y'],
    nucleus: ['a','e','i','o','u','ã','ĩ','ũ'],
    coda: ['','','',''],
    patterns: [
      { start: 'CV', mid: 'CV', end: 'V' },
      { start: 'V', mid: 'CV', end: 'CV' },
      { start: 'CV', mid: 'CV', end: 'CV' },
      { start: 'CV', mid: 'V', end: 'CV' },
    ],
    suffixes: ['a','i','u','ã','ĩ','na','ra','ba','gua','ma','pa','sa','ta'],
    prefixes: ['aba','acan','aco','agu','aiba','aim','ain','air','ait','aiu','aj','aju','ak','aku','am','aman','amb','ambu','amen','ami','amim','amp','amu','amun','an','ana','anaj','anam','anama','anan','ananga','anani','anapu','anau','anda','ande','andi','ando','andu','anga','angu','anha','ani','ano','anuan','ao','apa','ape','api','apig','apin','apira','apito','apo','apu','apua','ara','arac','arad','arai','araj','arak','aram','aran','arand','arap','arapo','arara','aras','arata','arati','aratu','arau','araun','are','ari','arij','arim','ario','arite','aro','aropo','arua','aruan','aruca','arue','arui','aruja','aruma','arumi','aruna','arura','aruta','aruya','asa','asi','asur','ata','ate','ati','atib','atin','ato','atua','au','aua','auan','auat','auê','auí','auit','auj','auka','aun','aura','auxi','ax','axé','aya','ayu','baca','bae','bae','bai','baito','bajé','bamba','bana','banab','banan','band','bara','baraú','barb','bari','bata','bate','bau','baya','bebe','beber','bemb','bene','ber','bera','beraba','beri','beró','beta','bi','bia','bibi','bico','big','bim','bina','bira','biri','birit','biro','bis','bita','bite','bitu','biu','bo','boa','bobó','boi','boi','boi','boia','boit','bom','bora','bora','borb','bore','bori','bota','boti','botó','botu','boy','bu','bubu','bui','buit','buju','bumba','buna','bura','buri','buri','buru','buta','butu','caá','caba','cabô','cac','caçu','cae','caf','cai','caiá','caic','caim','cais','caix','caj','cajá','caju','cal','cali','cam','cama','camb','cambi','came','cami','camo','camp','campi','camu','cana','cand','canga','cani','cano','canta','canti','canto','cap','capi','capim','capu','caput','capy','car','cara','carac','caraj','caram','caran','carap','carau','card','cari','carij','carim','carin','carip','caro','caru','carv','cas','cata','cati','catu','cau','cauã','caub','caubi','cauna','caur','cauri','caus','cav','cax','caxi','ce','ceará','cebi','ceci','ced','cei','cele','cen','ceo','cep','cer','ceri','cern','cero','cert','ces','cet','cev','cevi','chab','chac','chai','chama','chamb','chan','chana','chand','chani','chano','chapa','chapi','char','chara','charo','charu','chata','chati','chau','chauá','chav','che','cheba','chebi','chee','chefe','cheg','chei','chek','chela','chele','cheli','chelo','chema','chemi','chen','chena','chend','cheng','cheni','cheno','cheny','chepa','chepi','cher','chera','cheri','cheru','ches','cheta','cheti','cheto','cheu','cheva','chevi','chewa','chewi','chewo','chewu','chewy','chex','chey','chez','chiba','chibi','chibo','chibu','chica','chici','chico','chicu','chida','chidi','chido','chidu','chifa','chifi','chifo','chifu','chiga','chigi','chigo','chigu','chiha','chihi','chiho','chihu','chija','chiji','chijo','chiju','chika','chiki','chiko','chiku','chila','chili','chilo','chilu','chima','chimi','chimo','chimu','china','chini','chino','chinu','chipa','chipi','chipo','chipu','chira','chiri','chiro','chiru','chisa','chisi','chiso','chisu','chita','chiti','chito','chitu','chiu','chiva','chivi','chivo','chivu','chiwa','chiwi','chiwo','chiwu','chixa','chixi','chixo','chixu','chiya','chiyi','chiyo','chiyu','chiza','chizi','chizo','chizu','cho','chob','choc','chod','chof','chog','choi','choj','chol','chom','chon','chop','chor','chos','chot','chov','chow','chox','choy','choz','chu','chub','chuc','chud','chuf','chug','chui','chuj','chul','chum','chun','chup','chur','chus','chut','chuv','chuw','chux','chuy','chuz'],
  },
};

/**
 * Obtém uma lista de sílabas para uma origem específica.
 * Cada sílaba é gerada seguindo os padrões da origem.
 */
export function generateSyllable(origin) {
  const lang = Syllables[origin];
  if (!lang) return '';

  const pattern = lang.patterns[Math.floor(Math.random() * lang.patterns.length)];
  let syllable = '';

  // Build syllable from pattern
  for (const part of pattern.start) {
    if (part === 'C') syllable += lang.onset[Math.floor(Math.random() * lang.onset.length)];
    else if (part === 'V') syllable += lang.nucleus[Math.floor(Math.random() * lang.nucleus.length)];
  }

  return syllable;
}

export default Syllables;
