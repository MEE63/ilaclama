import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'
import TypewriterEffect from '../components/TypewriterEffect'

export default function PestDetail() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)

  // Haşere kategorileri - gerçek uygulamada Supabase'den gelecek
  const pestCategories = {
    'yuruyen-hasereler': {
      title: "Yürüyen Haşereler",
     
      image: "https://cdn.pixabay.com/photo/2013/02/01/10/59/giant-hissing-cockroach-77069_960_720.jpg",
      content: `
        <h2>Yürüyen Haşerelere Karşı Evde Tam Koruma Rehberi</h2>
        <h3>1. Aşama: Evin "Zırhını" Güçlendirme ve Girişleri Kapatma</h3>
        <p>Hamamböceği, karınca, gümüşçün, örümcek ve kırkayak gibi yürüyen haşerelerle mücadelenin temel felsefesi,
         evinizin yapısal bütünlüğünü koruyarak dışarıdan gelen davetsiz misafirlere kapıları kapatmaktır.
          Bu canlılar genellikle kapı altlarındaki milimetrik boşluklardan, pencere kenarlarındaki gözle
           görülmeyen çatlaklardan veya tesisat borularının geçiş noktalarından sızarlar. Bu nedenle, mücadelenin ilk 
           aşamasında bir dedektif titizliğiyle evinizin dış kabuğunu izole etmeniz gerekir.</p>
        
       <h3>Evinizi dış tehditlere karşı bir kale gibi korumak için şu yapısal önlemleri almalısınız:</h3>
       <p><b>Giriş Noktalarını Mühürleyin:</b> Süpürgelikler, kapı pervazları, fayans araları ve duvar diplerini kontrol edin. Bulduğunuz en ufak çatlağı bile silikon veya mastik ile kapatarak geçiş yollarını tıkayın. <br><br>

       <b>Nem Kaynaklarını Kurutun:</b> Gümüşçün ve kırkayak gibi türler hayatta kalmak için neme muhtaçtır. Banyo ve mutfaktaki damlatan muslukları tamir edin, boru diplerindeki boşlukları doldurun ve ortamı sık sık havalandırarak nem oranını düşürün. <br><br>

      <b>Kanalizasyon Bariyeri Oluşturun:</b> Kanalizasyon sisteminden gelebilecek hamamböceklerine karşı, banyo ve mutfak giderlerinde mutlaka kapaklı (çekvalfli) süzgeçler kullanın. Bu, yer altından gelen tehditleri %100 keser.</p> <br>
        
        <h3>2. Aşama: Besin Kaynaklarını Kesme ve "Aç Bırakma" Stratejisi</h3>
        <p>Fiziksel engelleri başarıyla oluşturduktan sonraki en kritik aşama, haşerelerin yaşam kaynağı olan besin ve barınma 
        imkanlarını ortadan kaldırmaktır; yani onları tabiri caizse "aç ve açıkta" bırakmaktır. Karınca ve hamamböcekleri,
         en ufak bir ekmek kırıntısının veya yağ lekesinin kokusunu metrelerce öteden alabilen gelişmiş sensörlere sahiptir. 
         Bu yüzden mutfak hijyeni, sadece temizlik değil, bir savunma stratejisidir.</p>
        
        <h3>Haşerelerin beslenme ve üreme zincirini kırmak için şu yöntemleri uygulayın:</h3>
        <p><b>Hava Almayan Saklama Kapları:</b> Bakliyat, un, şeker gibi gıdaları asla kendi kağıt veya ince plastik paketlerinde bırakmayın. Bu ürünleri cam veya sert plastik, kilitli kavanozlarda saklayarak kokunun yayılmasını engelleyin.<br><br>

           <b>Dip Köşe Derin Temizlik:</b> Özellikle buzdolabı ve fırın arkası gibi gözden kaçan, sıcak ve karanlık alanlar yağ birikintileriyle doludur ve haşereler için ziyafet alanıdır. Bu bölgeleri periyodik olarak çekip temizleyin.<br><br>

          <b>Dağınıklığı ve Kutuları Kaldırın:</b> Örümcekler ve böcekler saklanmayı sever. Nemli karton kutular, eski gazete yığınları ve gereksiz eşya kalabalığı onlar için mükemmel yumurtlama merkezleridir. Evdeki bu "saklanma kalelerini" derhal yok edin.</p>
        
        <h3>3. Aşama: Doğal Caydırıcılar ve Kimyasalsız Savunma Hattı</h3>
        <p>Son olarak, ağır kimyasallara başvurmadan önce evinizde doğal caydırıcılar ve bariyerler oluşturarak aktif bir savunma hattı
         kurabilirsiniz. Doğanın gücünü kullanarak, 
        haşerelerin biyolojisine ters gelen yöntemlerle onları yaşam alanınızdan uzaklaştırabilirsiniz.</p>
        
        <h3>Kimyasal kullanmadan evinizi korumak için şu doğal bariyer yöntemlerini kullanabilirsiniz:</h3>
        <p><b>Koku İzlerini Silin (Sirkeli Su):</b> Karıncalar yollarını bulmak için birbirlerini takip eden görünmez feromon izleri bırakır. Zeminleri ve tezgahları sirkeli su ile silmek, bu navigasyon sistemini bozarak onları şaşırtır ve dağıtır.<br><br>

            <b>Aromatik Caydırıcılar:</b> Nane, lavanta, sedir ağacı veya çay ağacı yağı gibi keskin kokular böcekler için dayanılmazdır. Bu esansiyel yağları suyla seyrelterek kapı eşiklerine ve pencere pervazlarına spreyleyerek görünmez bir koku duvarı örün.<br><br>

            <b>Diyatomlu Toprak (Diatomaceous Earth):</b> Tamamen doğal bir mineral olan bu tozu, çocukların ve evcil hayvanların ulaşamayacağı dolap arkalarına ve süpürgelik diplerine ince bir tabaka halinde serpin. Bu toz, üzerinden geçen haşerenin dış kabuğuna zarar vererek onları kurutur ve evinizden uzaklaştırır.</p>
      `
    },
    'ucan-hasereler': {
      title: "Uçan Haşereler",
    
      image: "https://cdn.pixabay.com/photo/2019/08/14/22/02/mosquito-4406812_1280.jpg",
      content: `
        <h2>Uçan Haşerelere Karşı Evde Tam Koruma Rehberi</h2>
        <h3>1. Aşama: Hava Sahasını Kapatma ve Fiziksel Bariyerler</h3>
        <p>Karasinek, sivrisinek, yaban arısı ve tatarcık gibi uçan haşerelerle mücadelenin altın kuralı, evinizin "hava sahasını" fiziksel olarak bloke etmektir. Bu canlılar, en ufak bir hava akımını veya ışık sızıntısını takip ederek yaşam alanınıza sızarlar. Özellikle yaz aylarında serinlemek için açılan pencereler ve balkon kapıları, eğer doğru korunmazsa onlar için davetiye niteliğindedir. Bu yüzden kimyasal savaştan önce, evinizin dış cephesindeki tüm hava giriş noktalarını kontrol altına almanız gerekir.</p>
        
        <h3>Uçan davetsiz misafirleri dışarıda tutmak için şu fiziksel önlemleri almalısınız:</h3>
        <p> <b>Sineklik Sistemlerinin Kontrolü:</b> Pencerelerinizde ve balkon kapılarınızda mutlaka sineklik bulunmalı. Mevcut sinekliklerdeki en ufak bir yırtık veya kenar boşluğu, sivrisineklerin sızması için yeterlidir; bunları derhal onarın veya yenileyin.<br><br>

           <b>Hava Akımı Bariyeri (Vantilatör):</b> Karasinek ve sivrisinekler aslında zayıf uçuculardır. Kapı girişlerinde veya sık kullanılan alanlarda çalıştıracağınız bir vantilatör veya tavan pervanesi, oluşturduğu yapay rüzgarla uçan haşerelerin rotasını bozar ve içeri girmelerini fiziksel olarak zorlaştırır.<br><br>

          <b>Baca ve Havalandırma Menfezleri:</b>  Sadece pencereler değil; banyo havalandırmaları ve mutfak bacaları da dışarıya açılan kapılardır. Bu alanların çıkışlarına ince gözenekli tel (mesh) takarak buradan giriş yapabilecek eşek arısı ve sinekleri engelleyin.</p>
         
        <h3>2. Aşama: Üreme Kaynaklarını Kurutma ve Cazibeyi Azaltma</h3>
        <p>Fiziksel engelleri aştıktan sonraki en önemli adım, evinizi uçan haşereler için bir "cazibe merkezi" olmaktan çıkarmaktır. Sivrisinekler yumurtlamak için durgun suya, karasinekler ve arılar ise fermente olmuş gıda kokularına ihtiyaç duyar. Evin çevresinde veya içinde bu şartları sağlayan ortamlar varsa, sinekleri mıknatıs gibi çekmeye devam edersiniz. Hedefiniz, onların koku alma duyularını ve üreme içgüdülerini boşa çıkarmak olmalıdır.</p>
        <h3>Evinizi uçan haşereler için "ilgisiz" hale getirmek için şunları uygulayın:</h3>
        <p><b>Durgun Su Birikintilerini Yok Edin:</b> Sivrisinekler bir çay kaşığı kadar suda bile üreyebilir. Balkondaki saksı altlıklarında biriken suları, evcil hayvan mama kaplarını veya bahçedeki su birikintilerini sık sık boşaltın. Bu, sivrisinek popülasyonunu kaynağında kurutur.<br><br>

           <b>Çöp ve Gıda Yönetimi:</b> Karasinekler ve yaban arıları çürüyen organik atıkların ve şekerli gıdaların kokusuna gelir. Çöp kovalarınızın ağzını daima kapalı tutun, olgunlaşmış meyveleri açıkta bırakmayın ve yemek artıklarını anında temizleyerek koku yayılmasını önleyin.<br><br> 

           <b>Işık Yönetimi:</b> Birçok uçan böcek beyaz ve parlak ışığa yönelir. Dış kapı girişlerinde veya balkonlarda, böcekleri daha az çeken sarı renkli (amber) LED ampuller veya sodyum buharlı lambalar kullanmak, gece toplanmalarını ciddi oranda azaltır.</p>
         
           <h3>3. Aşama: Doğal Kovucular ve Bitkisel Savunma</h3>
           <p>Evinizi fiziksel ve hijyenik olarak koruma altına aldıktan sonra, doğanın gücünü kullanarak uçan haşereleri uzak tutacak "görünmez kalkanlar" oluşturabilirsiniz. Kimyasal spreyler yerine, bu canlıların son derece hassas olan koku reseptörlerini rahatsız eden bitkisel çözümlerle onları yaşam alanınıza yaklaşmadan geri döndürebilirsiniz.</p>
           <h3>Kimyasalsız ve doğal bir savunma hattı için şu yöntemleri kullanabilirsiniz:</h3>

           <p><b>Doğal "Savar" Bitkiler:</b> Fesleğen, lavanta, biberiye, nane ve kadife çiçeği gibi bitkiler yaydıkları keskin aromalarla sivrisinek ve sinekleri doğal olarak uzaklaştırır. Pencere önlerinde veya balkonlarda bu bitkileri yetiştirmek canlı bir bariyer oluşturur.<br><br> 

               <b>Sirke ve Karanfil Tuzakları:</b> Bir limonu ikiye bölüp üzerine karanfil taneleri saplamak veya bir kaseye elma sirkesi koymak, özellikle karasinekleri ve tatarcıkları rahatsız ederek uzaklaştırır veya tuzağa çeker.<br><br> 

               <b>Uçucu Yağ Spreyleri:</b> Okaliptüs, limon otu (citronella) veya çay ağacı yağını suyla seyrelterek perde ve kapı eşiklerine sıkmak, uçan haşerelerin sevmediği bir koku bariyeri yaratır. Özellikle yaban arılarını uzak tutmak için nane yağı oldukça etkilidir.</p> 
      `
    },
    'kemirgenler': {
      title: "Kemirgenler",
      
      image: "https://cdn.pixabay.com/photo/2020/05/06/02/40/house-mouse-5135882_1280.jpg",
      content: `
        <h2>Kemirgenlere Karşı Evde Tam Koruma Rehberi (Fare, Sıçan ve Gelincik)</h2>
        <h3>1. Aşama: Kale Savunması ve Giriş Noktalarını "Zırhlama"</h3>
        <p>Fare, sıçan ve gelincik gibi kemirgenlerle mücadelenin en hayati kuralı, onların evinize girebileceği fiziksel yolları tamamen kapatmaktır. Özellikle fareler, esnek iskelet yapıları sayesinde bir kurşun kalem çapındaki delikten bile geçebilirler. Sıçanlar ise güçlü dişleriyle beton haricindeki birçok malzemeyi kemirebilir. Bu nedenle, evinizi dış dünyadan izole ederken sadece delikleri tıkamak yetmez; doğru malzemelerle "zırhlamanız" gerekir.</p>
        
        <h3>Kemirgenleri dışarıda tutmak için şu yapısal "zırhlama" yöntemlerini uygulayın:</h3>
        <p> <b>Çelik Yünü ve Tel Kullanımı</b> Kemirgenler köpük veya silikonu kolayca kemirebilir. Duvarlardaki çatlakları, boru girişlerini ve havalandırma boşluklarını kapatırken önce çelik yünü (bulaşık teli) veya metal sineklik teli sıkıştırın, ardından üzerini dolgu malzemesiyle kapatın. Çelik, dişlerini acıttığı için kemiremeyecekleri tek bariyerdir.<br><br> 

             <b>Kapı Altı Süpürgelikleri:</b> Özellikle garaj ve giriş kapılarının altındaki boşluklar, farelerin en sevdiği otobandır. Kapı altlarına sert fırçalı veya metal şeritli süpürgelikler monte ederek bu geçişi fiziksel olarak engelleyin.<br><br> 

              <b>Dış Cephe ve Çatı Kontrolü:</b> Sıçanlar ve gelincikler iyi tırmanıcıdır. Çatı saçaklarını, kiremit altlarını ve dış cephedeki sarmaşıkları kontrol edin. Eve temas eden ağaç dallarını budayarak "çatıya atlama köprülerini" yok edin.</p>
        
        <h3>2. Aşama: Cezbedicileri Yok Etme ve Barınma Alanlarını Temizleme</h3>
        <p>Eviniz ne kadar sağlam olursa olsun, içeride veya bahçenizde onları çeken bir şeyler varsa kemirgenler girmek için her yolu dener. Kemirgenler eve iki şey için gelir: Yemek ve sıcak bir yuva. Açıkta bırakılan gıdalar ve dağınık depolar, onlar için 5 yıldızlı bir otel davetiyesidir. Amacınız, evinizi onlar için "verimsiz ve saklanması zor" bir araziye dönüştürmektir.</p>
        
        <h3>Kemirgenlerin iştahını kesmek ve yuvalanmalarını önlemek için şunları yapın:</h3>
        <p><b>Zırhlı Saklama Kapları:</b> Kemirgenler karton kutuları ve plastik poşetleri saniyeler içinde deler. Bakliyatları, evcil hayvan mamalarını ve kuş yemlerini mutlaka cam, metal veya çok sert plastik kaplarda saklayın. Koku yoksa, ilgi de yoktur.<br><br> 

<b>Saklanma Alanlarını Yok Edin: Bodrum,</b> çatı katı veya garajdaki eski gazete yığınları, kumaş parçaları ve karton kutular fareler için mükemmel yuva malzemesidir. Bu alanlardaki dağınıklığı kaldırın, eşyaları zeminden yüksek raflara koyun ve kutu yerine plastik saklama kutuları kullanın.<br><br> 

<b>Dış Çevre Düzeni:</b> Evin dış duvarlarına bitişik duran odun yığınları, uzun otlar veya çöp konteynerleri kemirgenlerin gizlenerek eve yaklaşmasını sağlar. Bu unsurları evden en az yarım metre uzakta tutarak, evin çevresinde "açık ve güvensiz" bir alan yaratın.</p>
        
        <h3>3. Aşama: Doğal Caydırıcılar ve Stratejik Savunma</h3>
        <p>Fiziksel önlemleri aldıktan sonra, kemirgenlerin son derece hassas olan koku alma duyularını onlara karşı bir silah olarak kullanabilirsiniz. Ayrıca, eğer evin içinde şüpheli bir durum varsa, doğru tuzaklama stratejileriyle sorunu büyümeden çözebilirsiniz. Zehirli yemler, evcil hayvanlar ve çocuklar için risk oluşturabileceğinden, önceliği doğal kaçırıcılara ve güvenli tuzaklara vermelisiniz.</p>
        <h3>Kemirgenleri evinizden uzak tutmak için şu stratejik yöntemleri kullanın:</h3>
        <p><b>Keskin Koku Bariyeri (Nane Yağı):</b> Fareler ve diğer kemirgenler nane kokusundan nefret eder. Pamuk toplarına bolca nane yağı damlatıp bu topları dolap arkalarına, çekmece içlerine ve potansiyel giriş noktalarına yerleştirmek, onlar için dayanılmaz bir ortam yaratır.<br><br>

<b>Duvar Kenarı Stratejisi:</b> Eğer evde fare olduğundan şüpheleniyorsanız ve tuzak (canlı yakalama veya kapan) kuracaksanız, bunları asla odanın ortasına koymayın. Kemirgenler içgüdüsel olarak duvar diplerinden yürürler. Tuzakları duvarlara bitişik ve "T" şeklinde yerleştirmek başarı şansını %100 artırır.<br><br>

<b>Ultrasonik Kovucular:</b> Destekleyici bir yöntem olarak, insanların duyamadığı ama kemirgenleri rahatsız eden yüksek frekanslı ses yayan cihazlar, özellikle tavan araları ve bodrum gibi kapalı alanlarda caydırıcı bir etki yaratabilir.</p>
      `
    },
    'kan-emenler': {
      title: "Kan Emenler & Parazitler",
     
      image: "https://cdn.pixabay.com/photo/2023/08/28/07/43/castor-bean-tick-8218542_1280.jpg",
      content: `
        <h2>Kan Emen Parazitlere Karşı Tam Koruma Rehberi (Tahtakurusu, Pire, Kene, Bit)</h2>
        <h3>1. Aşama: "Truva Atı" Etkisini Önleme ve Karantina Kontrolü</h3>
        <p>Karınca veya farelerin aksine, kan emen parazitler genellikle kendi başlarına yürüyerek evinize girmezler; sizin, evcil hayvanlarınızın veya eşyalarınızın üzerinde "otostop çekerek" taşınırlar. Tahtakuruları bavullarla seyahatlerden, pire ve keneler evcil hayvanlardan, bitler ise kişisel temasla gelir. Bu yüzden savunma hattını kapı eşiğinde değil, giriş öncesi kontrollerde kurmanız gerekir. Evinizi bu sinsi istilacılara karşı bir karantina bölgesine dönüştürmelisiniz.</p>
        <h3>Parazitlerin evinize taşınmasını engellemek için şu "Giriş Kontrol" önlemlerini alın:</h3>
        <p><b>Seyahat Dönüşü Bavul Karantinası:</b> Tahtakuruları en çok otel odalarından taşınır. Tatil dönüşü bavulunuzu asla doğrudan yatak odasında açmayın. Eşyaları banyoda veya balkonda çıkarın, kıyafetleri doğrudan makineye atın ve bavulunuzun iç dikişlerini fenerle kontrol edip elektrikli süpürgeyle vakumlayın.<br><br>

            <b>Evcil Hayvan Denetimi:</b> Pire ve kene için 1 numaralı taşıyıcı kedi ve köpeklerdir. Dışarıdan gelen evcil hayvanınızı eve girmeden önce (özellikle kulak arkası, boyun ve pati aralarını) mutlaka tarayın ve kontrol edin. Veteriner onaylı dış parazit damlalarını aksatmadan uygulayarak onları yürüyen birer "kalkan" haline getirin.<br><br>

            <b>İkinci El Eşya Riski:</b> Dışarıdan eve sokacağınız ikinci el mobilyalar (özellikle koltuk ve yataklar) veya kıyafetler, tahtakurusu yumurtaları taşıyabilir. Bu eşyaları eve almadan önce çok detaylı bir incelemeden geçirin ve mümkünse buharlı temizleyici ile dezenfekte edin.</p>
        
        <h3>2. Aşama: Yüksek Isı Gücü ve Derinlemesine Vakumlama</h3>
        <p>Eğer bu parazitler bir şekilde içeri sızdıysa, besin kaynakları (kan) biz olduğumuz için onları "aç bırakma" şansımız yoktur. Tek çözüm, saklandıkları yerleri (yatak dikişleri, halı dipleri, saç kıvrımları) hedef alarak yaşam döngülerini kırmaktır. Bu canlıların en büyük zayıf noktası yüksek sıcaklıktır. Kimyasal ilaçların ulaşamadığı yumurtaları bile yok etmenin en kesin yolu, ısı ve mekanik temizliktir.</p>
        
        <h3>Parazitleri ve yumurtalarını yok etmek için şu "Termal Temizlik" yöntemlerini uygulayın:</h3>
        <p><b>60°C Yıkama Kuralı:</b> Yatak çarşafları, yastık kılıfları, evcil hayvan yatakları ve kıyafetler; bit, pire ve tahtakurusu yumurtalarından arınmak için en az 60°C sıcaklıkta yıkanmalıdır. Yıkanamayan eşyaları ise (yastık, peluş oyuncak) kurutma makinesinde yüksek ısıda 30 dakika çevirmek kesin çözümdür.<br><br>

          <b>Buharlı Temizlik (Steam Cleaning):</b>  Tahtakuruları yatak dikişlerinin en derinlerine saklanır. Yüksek basınçlı buharlı temizleyiciler, bu çatlaklara girerek hem yetişkinleri hem de yumurtaları saniyeler içinde haşlayarak öldürür. Yatak başlıklarını ve koltuk dikişlerini buharla tarayın.<br><br>

          <b>Halı ve Koltuk Vakumlama:</b>  Pireler larvalarını halı diplerine bırakır. Güçlü bir elektrikli süpürgeyle evi dip köşe süpürmek, popülasyonu %50 oranında azaltır. Ancak dikkat: Süpürme işlemi bitince torbayı veya hazneyi derhal ev dışındaki bir çöpe boşaltın, aksi halde oradan geri çıkabilirler.</p>
        
        <h3>3. Aşama: Doğal Kalkanlar ve Fiziksel Müdahale</h3>
        <p>Kimyasal böcek ilaçlarını, özellikle yatak odası ve vücudumuza temas eden alanlarda kullanmak her zaman son çare olmalıdır. Bunun yerine, parazitlerin biyolojisine zarar veren doğal mineraller ve onları uzak tutan bitkisel kokularla güvenli bir savunma hattı oluşturabilirsiniz. Ayrıca kene gibi yapışan parazitlerde doğru fiziksel müdahale hayati önem taşır.</p>
        
        <h3>Sağlığınızı riske atmadan korunmak için şu yöntemleri kullanın:</h3>
        <p><b>Diyatomlu Toprak (Doğal Kurutucu):</b> Tahtakurusu ve pireler için en etkili doğal silahtır. Bu tozu yatak ayaklarına, süpürgelik diplerine ve halı altına serpin. Üzerinden geçen parazitin dış kabuğunu çizerek su kaybetmesine ve ölmesine neden olur. Tamamen zehirsizdir.<br><br>

<b>Aromatik Kovucular:</b> Lavanta, çay ağacı (tea tree) ve okaliptüs yağları; özellikle bit ve pirelere karşı güçlü bir iticidir. Çocukların saçına veya evcil hayvan tasmalarına bu yağlardan (seyreltilmiş olarak) damlatmak, parazitlerin gelmesini zorlaştırır.<br><br>

<b>Fiziksel Kene Çıkarma:</b> Vücudunuzda veya hayvanınızda kene görürseniz üzerine asla yağ, alkol veya sabun dökmeyin; bu, kenenin kusmasına ve hastalık bulaştırmasına neden olur. İnce uçlu bir cımbızla, kenenin deriye girdiği en dip noktadan (kafasından) tutarak, ezmeden ve döndürmeden dik bir şekilde yukarı çekin.</p>
      `
    },
    'depo-zararlilari': {
      title: "Depo ve Gıda Zararlıları",
     
      image: "https://cdn.pixabay.com/photo/2022/08/17/12/43/moth-7392448_1280.jpg",
      content: `
        <h2>Depo ve Gıda Zararlılarına Karşı Tam Koruma Rehberi (Güve, Un Biti, Bakliyat Böcekleri)</h2>
        
        <h3>1. Aşama: "Truva Atı" Riskini Önleme ve İlk Kontrol</h3>
        <p>Mutfak güveleri, un bitleri ve bakliyat böcekleri ile mücadelenin en zor yanı, düşmanın genellikle eve aldığınız paketlerin içinde gizlenmiş olmasıdır. Bu zararlılar market raflarında, depolarda bekleyen paketlerin içine yumurtalarını bırakır ve siz fark etmeden onları evinize taşırsınız. Bir kez kilerinize girdiklerinde, ince plastik ambalajları ve karton kutuları kolayca delerek diğer temiz gıdalara da bulaşırlar. Bu yüzden savunma hattını market alışverişi sonrası, ürünleri dolaba yerleştirmeden hemen önce kurmalısınız.</p>
        
        <h3>Gıda zararlılarının mutfağınıza sızmasını engellemek için şu önlemleri alın:</h3>
        <p><b>Paket Denetimi:</b> Un, pirinç, makarna ve baharat gibi kuru gıdaları satın alırken ambalajlarını dikkatle inceleyin. Üzerinde iğne ucu kadar delik, ağ örümcekleri veya paketin dibinde tozlanma görürseniz o ürünü asla eve sokmayın.<br><br>

           <b>Şoklama (Dondurucu) Yöntemi:</b> Eve getirdiğiniz bakliyat, un veya baharatlarda gözle görülmeyen yumurtalar olma ihtimaline karşı en etkili profesyonel yöntem "şoklamadır". Ürünleri kavanozlamadan önce paketleriyle birlikte 24-48 saat derin dondurucuda bekletmek, olası tüm yumurta ve larvaları yok eder.<br><br>

           <b>İlk Giren İlk Çıkar (FIFO) Kuralı:</b> Kilerinizde eski ürünlerin arkada unutulup bozulmasına izin vermeyin. Yeni aldığınız ürünleri arkaya, eskileri öne koyarak sirkülasyon sağlayın. Unutulmuş ve tarihi geçmiş bir paket un, tüm mutfağı saracak bir güve istilasının başlangıç noktası olabilir.</p>
        
        <h3>2. Aşama: "Kale Tipi" Saklama ve İzolasyon Disiplini</h3>
        <p>Eğer bir pakette böceklenme başlarsa, hedefiniz bu istilayı o paketin içinde hapsetmek ve diğer gıdalara sıçramasını engellemektir. Marketten gelen kağıt, karton veya ince naylon ambalajlar, güçlü çene yapısına sahip bu böcekler için bir engel değildir; aksine delip geçmeleri saniyeler sürer. Bu nedenle mutfağınızda "açık büfe" devrini kapatıp, "zırhlı saklama" dönemine geçmeniz gerekir.</p>
        
        <h3>Gıdalarınızı korumak ve istilayı izole etmek için şu saklama kurallarını uygulayın:</h3>
        <p><b>Cam ve Sert Plastik Kavanozlar:</b> Kuru gıdaları asla kendi paketlerinde saklamayın. Vakumlu, hava almayan cam kavanozlar veya sert plastik kaplar kullanın. Bu kaplar, içeride bir böceklenme olsa bile dışarı çıkmalarını engeller; dışarıdaki böceklerin de temiz gıdaya ulaşmasını imkansız kılar.<br><br>

           <b> Raflarda Derin Temizlik:</b> Un tozu veya dökülen şeker taneleri raf köşelerinde birikir ve böcekleri çeker. Raflarınızı periyodik olarak boşaltıp, elektrikli süpürgenin ince ucuyla tüm kırıntıları vakumlayın. Özellikle raf pimlerinin girdiği delikler, güvelerin koza ördüğü gizli noktalardır; buraları kürdanla kontrol edip temizleyin.<br><br>

           <b> Bulaşmış Ürünü İmha Etme:</b> Eğer bir kavanozda ağlanma, topaklanma veya canlı böcek görürseniz "ayıklama" yoluna gitmeyin. O ürün artık tamamen kontamine olmuştur. Paketi sıkıca bağlayıp derhal ev dışındaki çöp konteynerine atın.</p>
        
        <h3>3. Aşama: Doğal Kovucular ve Ortam Kontrolü</h3>
        <p>Gıda maddelerinin bulunduğu alanda kimyasal böcek ilacı kullanmak, sağlığınız için böceklerin kendisinden daha tehlikelidir. Bunun yerine, bakliyat böceklerinin ve güvelerin biyolojisine ters gelen, koku duyularını rahatsız eden doğal bitkilerle güvenli bir savunma hattı oluşturabilirsiniz. Ayrıca ortamın nem ve sıcaklık dengesini korumak, bu canlıların üremesini yavaşlatır.</p>
        <h3>Mutfağınızı kimyasalsız korumak için şu doğal yöntemleri kullanın:</h3>
        <p><b>Defne Yaprağı Kalkanı:</b> Defne yaprağı (bay leaf), yüzyıllardır kullanılan en etkili doğal güve savardır. Kavanozların içine (pirinç, un vb.) birer adet kurutulmuş defne yaprağı koymak veya raflara serpiştirmek, keskin kokusuyla böcekleri uzak tutar ve gıdanın tadını bozmaz.<br><br>

           <b>Sirke ile Dezenfeksiyon:</b> Rafları temizlerken deterjan yerine sirkeli su kullanın. Sirke, hem böceklerin bıraktığı yumurtaları öldürür hem de güvelerin birbirini bulmasını sağlayan koku izlerini yok eder.<br><br>

           <b>Nem ve Sıcaklık Yönetimi:</b> Bu zararlılar sıcak ve nemli ortamları sever. Kilerinizi mümkün olduğunca serin ve kuru tutun, sık sık havalandırın. Lavanta, sedir ağacı blokları veya karanfil gibi kokular da güvelerin sevmediği ve uzak durduğu doğal bariyerlerdir.</p><br><br>
      `
    },
    'ahsap-zararlilari': {
      title: "Ahşap ve Yapı Zararlıları",
     
      image: "https://cdn.pixabay.com/photo/2019/08/13/23/33/woodworm-4404382_1280.jpg",
      content: `
        <h2>Ahşap ve Yapı Zararlılarına Karşı Tam Koruma Rehberi (Termit, Tahtakurdu)</h2>
        <h3>1. Aşama: "Sessiz Tehlikeyi" Erken Teşhis ve Akustik Kontrol</h3>
        <p>Termitler ve tahtakuruları, ağacın yüzeyinde değil, derinliklerinde yaşadıkları için onları gözle görmek zordur. Genellikle geride bıraktıkları izler görüldüğünde istila ilerlemiş demektir. Bu nedenle evinizdeki ahşap zeminleri, antika mobilyaları, çatı kirişlerini ve kapı kasalarını periyodik olarak bir "sağlık taramasından" geçirmeniz gerekir. Sessiz bir ortamda yapacağınız dikkatli bir inceleme, binlerce liralık zararı önleyebilir.</p>

        
        <h3>İstilayı başlamadan tespit etmek için şu ipuçlarını takip edin:</h3>
        <p><b>İnce Toz (Talaş) İzleri:</b> Mobilya altlarında veya ahşap deliklerinin girişinde birikmiş ince, una benzer toz yığınları (frass) görüyorsanız, bu aktif bir tahtakurdu istilasının en net kanıtıdır.<br><br>

           <b>Çıkış Delikleri:</b> Ahşap yüzeylerde iğne ucu büyüklüğünde (1-2 mm) yuvarlak delikler açılmışsa, bu yetişkin böceklerin yumurtadan çıkıp terk ettiğini gösterir; ancak içeride hala larvalar olabilir.<br><br>

           <b>Akustik Test (Kof Sesler):</b> Ahşap panellere veya kirişlere tornavida sapıyla hafifçe vurun. Eğer tok bir ses yerine "kof" ve boş bir ses geliyorsa, o ahşabın içi termitler veya kurtlar tarafından yenmiş olabilir.</p>
        
        <h3>2. Aşama: Ahşabı "Zırhlama" ve Nemi Kesme</h3>
        <p>Bu zararlıların bir numaralı yaşam kaynağı nemli ve işlenmemiş ahşaptır. Kuru ve verniklenmiş bir ağaç, onlar için hem besleyici değildir hem de içine girmesi zordur. Özellikle termitler topraktaki neme muhtaçtır. Evinizdeki ahşap eşyaları korumanın en etkili yolu, onları "ham" halde bırakmamak ve nemden tamamen izole etmektir.</p>
        
        <h3>Ahşap eşyalarınızı ve yapınızı korumak için şu önlemleri alın:</h3>
         <p><b>Yüzey Kaplama (Boya ve Vernik):</b> Ham ahşap, böcekler için açık büfedir. Tüm ahşap yüzeyleri cila, vernik veya boya ile kaplayarak dış kabuğu mühürleyin. Bu işlem, yetişkin böceklerin yumurta bırakmak için ahşabın içine girmesini fiziksel olarak engeller.<br><br>

           <b>Toprak Temasını Kesin:</b> Özellikle bahçeli evlerde, evin ahşap kısımlarının veya yakacak odun yığınlarının doğrudan toprakla temas etmesine asla izin vermeyin. Toprak, termitlerin eve geçiş köprüsüdür. Ahşap yapıları beton kaideler üzerine oturtun.<br><br>

          <b> Nem Kontrolü:</b> Tahtakuruları kuru ahşapta (nem oranı %8-10 altı) yaşayamaz. Evinizi sık sık havalandırın, rutubetli odalarda nem alma cihazı kullanın. Islanan parkeleri veya mobilyaları asla nemli bırakmayın, hemen kurutun.</p>
         
        <h3>3. Aşama: Doğal Koruyucular ve Şoklama Yöntemleri</h3>
        <p>Eğer küçük çaplı bir istiladan şüpheleniyorsanız veya antika bir eşyayı korumak istiyorsanız, ağır kimyasallar yerine ahşabın yapısını bozmayan profesyonel ve doğal yöntemlere başvurabilirsiniz. Bu yöntemler, larvaların gelişimini durdurur ve yetişkinleri uzaklaştırır. Ancak binanın taşıyıcı kolonlarında büyük bir hasar varsa mutlaka profesyonel ilaçlama desteği alınmalıdır.</p>
        
        <h3>Ahşap zararlılarını durdurmak için şu yöntemleri kullanabilirsiniz:</h3>
        <p><b>Dondurma (Şoklama) Tekniği:</b> Küçük ahşap objelerde veya aksesuarlarda kurtlanma varsa, bu eşyayı bir poşete sarıp derin dondurucuda 72 saat bekletmek, ahşabın derinliklerindeki tüm larva ve yumurtaları kesin olarak öldürür.<br><br>

           <b>Boraks Kalkanı:</b> Borik asit (veya boraks), ahşap zararlıları için en etkili doğal zehirdir. Sıcak suda çözdüğünüz boraksı bir fırça yardımıyla ham ahşap yüzeylere sürerek emdirmek, o ahşabı böcekler için ömür boyu yenilemez hale getirir.<br><br>

           <b>Sedir ve Okaliptüs Yağı:</b> Bu böcekler sedir ağacının kokusundan nefret eder. Ahşap dolapların içine sedir blokları koymak veya çatlaklara sedir/okaliptüs yağı enjekte etmek, yetişkin böcekleri yumurta bırakmaktan vazgeçirir. </p>
      `
    }
  }

  const pest = pestCategories[slug]

  useEffect(() => {
    // Simüle loading
    setTimeout(() => setLoading(false), 500)
  }, [])

  if (loading) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <GridBackground />
        <Navbar />
        <div style={{ 
          padding: '200px 24px', 
          textAlign: 'center',
          color: '#546a7b',
          position: 'relative',
          zIndex: 1
        }}>
          Yükleniyor...
        </div>
        <Footer />
      </div>
    )
  }

  if (!pest) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <GridBackground />
        <Navbar />
        <div style={{ 
          padding: '200px 24px', 
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{ color: '#393d3f', marginBottom: '20px' }}>Sayfa Bulunamadı</h1>
          <Link to="/hasere-rehberi" style={{ color: '#62929e', textDecoration: 'none', fontWeight: '600' }}>
            ← Haşere Rehberine Dön
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <GridBackground />
      
      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Navbar />
      </div>

      {/* Hero Image */}
      <div style={{
        position: 'relative',
        height: '400px',
        overflow: 'hidden'
      }}>
        <img 
          src={pest.image}
          alt={pest.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height
            e.currentTarget.style.transform = `scale(1.05) translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translate(0, 0)'
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '60px 24px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <Link 
              to="/hasere-rehberi"
              style={{
                color: '#fdfdff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '15px',
                display: 'inline-block',
                opacity: 0.9,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1'
                e.target.style.transform = 'translateX(-5px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '0.9'
                e.target.style.transform = 'translateX(0)'
              }}
            >
              ← Haşere Rehberine Dön
            </Link>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '900',
              color: '#fdfdff',
              margin: 0,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              <TypewriterEffect text={pest.title} />
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 24px',
        background: 'rgba(253, 253, 255, 0.95)',
        minHeight: '60vh'
      }}>
        {pest.description && (
          <div style={{
            fontSize: '1.2rem',
            color: '#546a7b',
            lineHeight: '1.8',
            marginBottom: '40px',
            fontStyle: 'italic',
            borderLeft: '4px solid #62929e',
            paddingLeft: '20px'
          }}>
            {pest.description}
          </div>
        )}

        <div 
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.9',
            color: '#393d3f'
          }}
          dangerouslySetInnerHTML={{ __html: pest.content }}
        />

        {/* CTA Section */}
        <div style={{
          marginTop: '60px',
          padding: '40px',
          background: 'linear-gradient(135deg, #62929e 0%, #546a7b 100%)',
          borderRadius: '16px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(98, 146, 158, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)'
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(98, 146, 158, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(98, 146, 158, 0.3)'
        }}
        >
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#fdfdff',
            marginBottom: '15px'
          }}>
            Profesyonel Yardıma mı İhtiyacınız Var?
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(253, 253, 255, 0.9)',
            marginBottom: '25px'
          }}>
            Uzman ekibimiz size yardımcı olmak için hazır.
          </p>
          <Link
            to="/iletisim"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#fdfdff',
              color: '#393d3f',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1.1rem',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Hemen İletişime Geç →
          </Link>
        </div>
      </article>

      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Footer />
      </div>

      <style>{`
        /* Floating particles animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        article {
          animation: fadeInUp 0.8s ease-out;
        }
        
        article h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #393d3f;
          margin: 40px 0 20px 0;
          line-height: 1.3;
          position: relative;
          padding-left: 0;
          transition: all 0.3s ease;
          cursor: default;
        }
        
        article h2:before {
          content: '';
          position: absolute;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 0;
          background: linear-gradient(180deg, #62929e, #546a7b);
          transition: height 0.3s ease;
          border-radius: 2px;
        }
        
        article h2:hover:before {
          height: 100%;
        }
        
        article h3 {
          font-size: 1.5rem;
          fontWeight: 700;
          color: #546a7b;
          margin: 30px 0 15px 0;
          transition: color 0.3s ease, transform 0.3s ease;
          cursor: default;
        }
        
        article h3:hover {
          color: #62929e;
          transform: translateX(5px);
        }
        
        article p {
          margin-bottom: 20px;
        }
        
        article ul {
          margin: 20px 0;
          padding-left: 30px;
        }
        
        article li {
          margin-bottom: 10px;
          line-height: 1.7;
          position: relative;
          transition: all 0.3s ease;
          padding-left: 10px;
        }
        
        article li:hover {
          transform: translateX(5px);
          color: #393d3f;
          font-weight: 500;
        }
        
        article li:before {
          content: '→';
          position: absolute;
          left: -20px;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: #62929e;
        }
        
        article li:hover:before {
          opacity: 1;
        }

        /* Floating background elements */
        .bg-float-1, .bg-float-2, .bg-float-3 {
          position: fixed;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(98, 146, 158, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        
        .bg-float-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          right: 5%;
          animation: float 8s ease-in-out infinite;
        }
        
        .bg-float-2 {
          width: 200px;
          height: 200px;
          bottom: 20%;
          left: 10%;
          animation: float 10s ease-in-out infinite 2s;
        }
        
        .bg-float-3 {
          width: 250px;
          height: 250px;
          top: 50%;
          right: 15%;
          animation: float 12s ease-in-out infinite 4s;
        }
      `}</style>

      {/* Floating background elements */}
      <div className="bg-float-1"></div>
      <div className="bg-float-2"></div>
      <div className="bg-float-3"></div>
    </div>
  )
}
