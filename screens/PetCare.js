import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const PetCare = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

 

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>BLOG</Text>

      <View style={styles.section}>
        <Image 
          source={require('../assets/kopus.jpg')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.dogText]}>Köpek Bakımı</Text>
        
        <TouchableOpacity onPress={() => toggleSection('dogPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'dogPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Köpekler oyun oynamayı çok severler ve bu oyunlar onların fiziksel ve zihinsel sağlıkları için çok önemlidir. Fırlatma oyunları, saklambaç ve çekiştirme oyunları en popüler olanlardır. Çeşitli oyuncaklar kullanarak köpeğinizin aktif kalmasını sağlayabilirsiniz.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('dogHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'dogHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Köpeğinizin sağlığında bir değişiklik fark ederseniz, veterinerinize danışmalısınız. Genetik faktörler, yaş, yaşam tarzı ve çevresel koşullar gibi birçok neden sağlık sorunlarına yol açabilir. Düzenli veteriner kontrolleri önemlidir.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('dogSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'dogSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Köpeğinizdeki sağlık sorunları çeşitli belirtilerle kendini gösterebilir. Öksürme, hapşırma, iştah kaybı, halsizlik gibi belirtiler ciddiye alınmalı ve veteriner kontrolü sağlanmalıdır.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('dogCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'dogCare' && (
          <Text style={styles.text}>
            {'\u2022'} Köpeğinizin güvenliği için evde bazı önlemler almalısınız. Tehlikeli maddeleri erişemeyeceği yerlerde saklamak, elektrik kablolarını gizlemek ve küçük oyuncakları ortadan kaldırmak önemlidir.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('dogTravel')}>
          <Text style={styles.boldText}>Köpeklerle Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'dogTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Köpeğinizle seyahat ederken rahat ve güvenli bir taşıma çantası kullanmalısınız. Araç içinde köpeğinizi güvenli bir şekilde sabitlemek ve mola vererek onu dinlendirmek de önemlidir.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('dogGrooming')}>
          <Text style={styles.boldText}>Köpeğinizin Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'dogGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Köpeğinizin tüylerini düzenli olarak taramak, tüy dökülmesini azaltır ve derisinin sağlıklı kalmasını sağlar. Tüy bakımı sırasında köpeğinizin rahat olduğundan emin olun ve sevdiği noktalardan başlayarak tarama işlemini yapın.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('dogTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'dogTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Köpekler, olumlu pekiştirme ile en iyi şekilde eğitilirler. İyi davranışlarını ödüllendirin ve kötü davranışlarını nazikçe düzeltin. Sabırlı olun ve tutarlı bir eğitim yöntemi uygulayın.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('dogToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'dogToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Köpeğinizin tuvalet eğitimi sabır gerektirir. Onu belirli zamanlarda dışarı çıkararak ve tuvaletini yaptığında ödüllendirerek bu süreci hızlandırabilirsiniz.
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Image 
          source={require('../assets/kedii.jpg')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.catText]}>Kedi Bakımı</Text>
        
        <TouchableOpacity onPress={() => toggleSection('catPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'catPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Kediler oyun oynamaya bayılırlar ve bu konuda ihtiyaç duydukları tek şey biraz yaratıcılıktır. Öncelikle, bir avlanma oyunu için bir ödül mamasını evinizin etrafında saklamayı deneyin. Kediler doğal bir avcı olarak doğdukları için sürpriz şeyleri aramayı severler. Ayrıca saklambaç da oynayabilirsiniz. Evinizdeki farklı odalara geçip onun adını söyleyin ve sizi her bulduğunda onu ödüllendirmeyi unutmayın. Kedi oyuncakları da kedileri hareket ettirmek için harika bir yoldur. Ucunda tüyler olan çubuk, küçük uzaktan kumandalı araba ve çıngırak gibi oyuncakları deneyin. Veya oyuncaklarından birine bir ip bağlayın ve hızlıca çektiğinizde ip hareket ediyormuş gibi görüneceğinden anında üzerine atlayacaktır. Hatırlanması gereken tek şey, kedinizin elleriniz ve parmaklarınızı "av" olarak kullanmasına asla izin vermemektir. Bunu yaptığınızda insanların av olmadığını öğreteceksin. Bu davranışını kedinizde bir alışkanlık haline gelmeden durdurmak en iyisidir çünkü bu, değiştirilmesi zor bir alışkanlıktır.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('catHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'catHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Kediniz farklı davranıyorsa ve siz onun sağlığı için endişeleniyorsanız veterinerinizle konuşmak en iyisidir. Burada, kedilerde görülen çeşitli sağlık sorunları ve bunların nedenleri hakkında bilgi edinebilirsiniz. Genetik yapı, ırk, yaş, yaşam tarzı, zihinsel durum, davranış veya çevre koşullarına bakılmaksızın, kedinizde bir değişiklik olduğunu fark ettiğinizde aklınızda tutmanız gereken birçok ortak neden vardır. Bu ortak nedenleri öğrenmeye başlayın, böylece ona her zaman doğru bir şekilde bakmaya hazır olun.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('catSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'catSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Sağlık sorunları çeşitli şekillerde kendini gösterir. Bazıları son derece barizdir ve artan sıklıkta idrara çıkma, stres ve aşırı tüy yalama gibi belirgin belirtilere sahiptir. Ancak diğer kedi sağlığı semptomlarının fark edilmesi kolay değildir. Kişiliğini ve bazı durumlarda nasıl tepki vereceğini öğrenin. Ruh hali ya da davranışlarındaki değişiklikler, bir sağlık sorununun belirmekte olduğunu gösterebilir.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('catCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'catCare' && (
          <Text style={styles.text}>
            {'\u2022'} Eviniz şimdiye kadar yaşadığı en rahat yer olabilir, ancak burası doğru önlemleri almadığınızda bazen çok tehlikeli alanlara dönüşebilir. Evdeki her kuytu ve köşeyi bir kedinin bakış açısıyla inceleyerek evinizi kediler için zararsız hale getirin. İçerisinde antifriz gibi zehirli kimyasal barındıran dolapların açık olduğunu fark ederseniz, kedinizi tehlikeden uzak tutmak için bu dolapları kilitleyin. Her türlü sallanan ip veya kablo çekiştirme nedeniyle büyük bir karmaşa veya yaralanmaya neden olabilir. Ayrıca, bazı ev bitkileri kediler için zehirli olabileceğinden, onları kedilerin ulaşamayacakları bir yere koyun. Bunlar dikkat edilmesi gereken tehlikelerden sadece birkaçı.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('catTravel')}>
          <Text style={styles.boldText}>Kedilerle Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'catTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Çoğu kedi seyahat etmeye sizin kadar bayılmaz. Bunun yerine, kendi bölgelerine sadık kalmayı tercih ederler ve evden uzakta olmaktan rahatsızlık duyarlar. Ancak, bir yolculuk yapmaya ya da kedilerle yeni bir eve taşınmaya karar verirseniz, uygun bir taşıma sepeti almanız ve yeni yere alışıncaya kadar onu sınırlı alanda tutmanız gerekir. Bazı havayolu şirketlerinin kuralları kedilerin uçağın ısıtmalı ve basınçlı ayrı bir bölümünde seyahat etmesini gerektirdiği için kedilerle uçmak biraz daha planlama yapmayı zorunlu kılar.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('catGrooming')}>
          <Text style={styles.boldText}>Kedinizin Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'catGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Muhtemelen zaten bildiğiniz gibi, çoğu kedi günün büyük bir kısmını kendilerine bakım yaparak geçirir ancak bazen bu konuda biraz ekstra yardıma ihtiyaçları olur (örneğin tüylerine bir şey dolaştığında olduğu gibi). Onun tüylerini her taradığınızda, rahat olduğundan emin olun. Onu taramanız gerekiyorsa, işe en sevdiği noktaları taramakla başlayın ve daha sonra yavaş yavaş ve sessizce diğer alanlara ilerleyerek bunun sizin için de olumlu bir deneyim olmasını sağlayın.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('catTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'catTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Birincisi ve en önemlisi şu ki; kediler cezadan anlamaz. Doğru davranışları teşvik etmek çok daha etkilidir. İşe yaramaz gibi geliyor değil mi? Kesinlikle işe yarayacak. Vazgeçmesini istediğiniz bir şey yapıyorsa, ona nazikçe ve net bir şekilde 'hayır' deyin. Ve eğer teşvik ettiğiniz bir şey yapıyorsa, bütün sevginizi ve dikkatinizi ona verin. Ödül mamaları daima motive edicidir, bu nedenle elinizin altında bazı ödül mamalarından mutlaka bulundurun. (Fakat bunlardan çok fazla vermeme konusunda dikkatli olun.)
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('catToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'catToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Kediler doğası gereği temiz canlılardır, bu yüzden tuvalet kullanmayı zaten biliyor olması büyük bir ihtimaldir. Seninle yaşamak için evinize gelmeden önce tuvalet kutusunu hazırlayın. Evinizde yeterli alan varsa, ona birden fazla kutu sağlayın. Onları sessiz, sakin yerlere koyun ve her gün temizlemeyi unutmayın.
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Image 
          source={require('../assets/kuss.webp')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.birdText]}>Kuş Bakımı</Text>
        
        <TouchableOpacity onPress={() => toggleSection('birdPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'birdPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Kuşlar için oyuncaklar, tüy dökme sürecini azaltmak ve onları zihinsel olarak meşgul etmek için önemlidir. Çeşitli oyuncaklar ve aktivitelerle kuşunuzun günlük hayatını zenginleştirin. Uçma alanı sağlayarak doğal hareketlerini destekleyin.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('birdHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'birdHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Kuşlar, çeşitli sağlık sorunlarına karşı hassastır. İshal, tüy dökülmesi, nefes darlığı gibi belirtiler sağlık sorunlarının habercisi olabilir. Düzenli veteriner kontrolleri kuşunuzun sağlığını korumak için önemlidir.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('birdSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'birdSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Kuşlardaki sağlık sorunları genellikle davranış değişiklikleriyle kendini gösterir. İştah kaybı, tüy yolma, sessizlik gibi belirtiler dikkate alınmalıdır.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('birdCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'birdCare' && (
          <Text style={styles.text}>
            {'\u2022'} Kuşlar için güvenli bir ortam sağlamak önemlidir. Zehirli bitkileri erişimlerinden uzak tutun, kafeslerini düzenli olarak temizleyin ve sağlıklı bir yaşam alanı oluşturun.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('birdTravel')}>
          <Text style={styles.boldText}>Kuşlarla Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'birdTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Kuşlar, taşıma sürecinde strese girebilirler. Onlar için rahat ve güvenli bir taşıma kutusu seçin ve yolculuk sırasında sık sık dinlenme molaları verin.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('birdGrooming')}>
          <Text style={styles.boldText}>Kuşlarınızın Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'birdGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Kuşların tüy bakımı, sağlıkları için çok önemlidir. Düzenli olarak banyo yaptırarak ve tüylerini kontrol ederek bakımını sağlayın.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('birdTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'birdTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Kuşlar da eğitim alabilirler. Olumlu pekiştirme yöntemleri kullanarak çeşitli numaralar öğretebilir ve davranışlarını şekillendirebilirsiniz.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('birdToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'birdToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Kuşlar için özel olarak tasarlanmış tuvalet alanları kullanarak tuvalet eğitimini sağlayabilirsiniz.
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Image 
          source={require('../assets/fish1.png')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.fishText]}>Balık Bakımı</Text>
        
        <TouchableOpacity onPress={() => toggleSection('fishPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'fishPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Balıklar için akvaryum içerisine yerleştirilen bitki ve dekoratif objeler onların keşfetmesi ve doğal ortamlarına yakın hissetmeleri için önemlidir. Akvaryumda farklı yüzme alanları oluşturmak balıkların stresini azaltır.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('fishHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'fishHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Balıklar, su kalitesindeki değişiklikler, beslenme eksiklikleri ve parazitler nedeniyle hastalanabilirler. Su sıcaklığı, pH ve amonyak seviyelerini düzenli olarak kontrol edin.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('fishSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'fishSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Balıklarda sağlık sorunları genellikle davranış değişiklikleri ve fiziksel belirtilerle kendini gösterir. İştah kaybı, solunum zorluğu, yüzme bozuklukları gibi belirtiler dikkatle izlenmelidir.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('fishCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'fishCare' && (
          <Text style={styles.text}>
            {'\u2022'} Balıklar için akvaryum temizliği çok önemlidir. Haftalık su değişimleri yaparak ve filtre sistemini düzenli olarak kontrol ederek sağlıklı bir yaşam ortamı sağlayın.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('fishTravel')}>
          <Text style={styles.boldText}>Balıklarla Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'fishTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Balıkların taşınması dikkat gerektirir. Küçük bir taşıma akvaryumu kullanarak ve suyu stabil tutarak balıklarınızı güvenli bir şekilde taşıyabilirsiniz.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('fishGrooming')}>
          <Text style={styles.boldText}>Balıklarınızın Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'fishGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Balıklar tüyleri olmadığı için onların bakımında su kalitesi ve beslenme en önemli faktörlerdir. Temiz su ve dengeli beslenme balık sağlığını korur.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('fishTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'fishTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Balıklar için eğitim genellikle mümkün olmasa da, akvaryum düzenlemeleri ve beslenme zamanlamaları ile onların davranışlarını şekillendirebilirsiniz.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('fishToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'fishToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Balıklar için özel bir tuvalet eğitimi yoktur, ancak akvaryum temizliği düzenli olarak yapılmalıdır.
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Image 
          source={require('../assets/HAMSTER.png')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.hamsterText]}>Hamster Bakımı</Text>
        
        <TouchableOpacity onPress={() => toggleSection('hamsterPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'hamsterPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Hamsterlar için tekerlekler, tüneller ve çeşitli oyuncaklar önemlidir. Bu oyuncaklar onların enerjilerini atmaları ve zihinlerini meşgul etmeleri için gereklidir.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('hamsterHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'hamsterHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Hamsterlar, yanlış beslenme, yetersiz temizlik ve stres nedeniyle hastalanabilirler. Temiz su ve doğru beslenme sağlanmalıdır.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('hamsterSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'hamsterSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Hamsterlardaki sağlık sorunları genellikle davranış değişiklikleri ve fiziksel belirtilerle kendini gösterir. İştah kaybı, tüy dökülmesi, hareketsizlik gibi belirtiler dikkate alınmalıdır.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('hamsterCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'hamsterCare' && (
          <Text style={styles.text}>
            {'\u2022'} Hamsterlar için temiz bir kafes sağlamak ve düzenli olarak altlık değiştirmek önemlidir. Ayrıca, kemirgen dostlarınızın diş sağlığı için kemirme oyuncakları bulundurmalısınız.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('hamsterTravel')}>
          <Text style={styles.boldText}>Hamsterlarla Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'hamsterTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Hamsterların taşınması sırasında rahat ve güvenli bir taşıma kutusu kullanmalısınız. Onları sakinleştirmek için taşıma sırasında yumuşak bir battaniye ile örtü sağlayabilirsiniz.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('hamsterGrooming')}>
          <Text style={styles.boldText}>Hamsterlarınızın Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'hamsterGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Hamsterların tüy bakımı genellikle kendi kendilerine yeterlidir, ancak gerekirse yumuşak bir fırça ile yardımcı olabilirsiniz.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('hamsterTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'hamsterTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Hamsterlar için eğitim genellikle temel alışkanlıklar ve davranış şekillendirme ile sınırlıdır. Onlara nazik davranın ve olumlu pekiştirme kullanın.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('hamsterToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'hamsterToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Hamsterlar, kafeslerinin bir köşesini tuvalet alanı olarak kullanma eğilimindedirler. Bu alanı düzenli olarak temizlemek önemlidir.
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Image 
          source={require('../assets/tavşan2.webp')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.rabbitText]}>Tavşan Bakımı</Text>
        
        <TouchableOpacity onPress={() => toggleSection('rabbitPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'rabbitPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Tavşanlar, oyun oynamayı ve keşfetmeyi seven sosyal hayvanlardır. Onlar için tüneller, çiğneme oyuncakları ve zıplayabilecekleri alanlar oluşturun. Oyun zamanını günlük rutinin bir parçası haline getirin.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('rabbitHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'rabbitHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Tavşanlar, sindirim sorunları, diş problemleri ve cilt hastalıklarına karşı hassastır. Doğru beslenme ve düzenli veteriner kontrolleri sağlıklı kalmaları için önemlidir.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('rabbitSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'rabbitSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Tavşanlardaki sağlık sorunları genellikle davranış değişiklikleri ve fiziksel belirtilerle kendini gösterir. İştah kaybı, kabızlık, diş gıcırdatma gibi belirtiler veteriner kontrolünü gerektirir.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('rabbitCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'rabbitCare' && (
          <Text style={styles.text}>
            {'\u2022'} Tavşanlar için güvenli ve temiz bir yaşam alanı oluşturun. Onların çiğneme ve kazma ihtiyaçlarını karşılayacak oyuncaklar sağlayın ve evde zehirli bitkiler bulundurmayın.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('rabbitTravel')}>
          <Text style={styles.boldText}>Tavşanlarla Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'rabbitTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Tavşanlar, taşınma sırasında strese girebilirler. Rahat ve güvenli bir taşıma kutusu kullanarak, onlara tanıdık bir battaniye veya oyuncak koyarak taşınma sürecini kolaylaştırabilirsiniz.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('rabbitGrooming')}>
          <Text style={styles.boldText}>Tavşanlarınızın Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'rabbitGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Tavşanlar düzenli olarak taranmalıdır, özellikle de uzun tüylü cinsler. Tüy bakımı, tüy dökülmesini azaltır ve cilt sağlığını korur. Tavşanınızın tüylerini nazikçe tarayarak bu süreci keyifli hale getirin.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('rabbitTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'rabbitTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Tavşanlar, olumlu pekiştirme ile eğitilebilirler. Tuvalet eğitimi ve basit komutlar öğretmek için sabırlı olun ve her başarıyı ödüllendirin.
          </Text>
        )}

        <TouchableOpacity onPress={() => toggleSection('rabbitToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'rabbitToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Tavşanlar, genellikle doğal olarak tuvalet kullanma eğilimindedirler. Onlara uygun bir tuvalet alanı sağlayarak ve bu alanı temiz tutarak tuvalet eğitimini kolaylaştırabilirsiniz.
          </Text>
        )}
      </View>


      
      <View style={styles.section}>
        <Image 
          source={require('../assets/yılann.jpg')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.snakeText]}>Yılan Bakımı</Text>
        <TouchableOpacity onPress={() => toggleSection('snakePlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'snakePlay' && (
          <Text style={styles.text}>
            {'\u2022'} Yılanlar için oyunlar ve oyuncaklar, doğal avlanma davranışlarını teşvik etmek için önemlidir. Akvaryumlarında gizlenebilecekleri alanlar ve çeşitli tüneller sağlanabilir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snakeHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'snakeHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Yılanlar, parazitler, beslenme eksiklikleri ve uygun olmayan yaşam koşulları nedeniyle hastalanabilirler. Düzenli olarak veteriner kontrolü yapılmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snakeSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'snakeSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Yılanlarda sağlık sorunları iştahsızlık, deride lezyonlar ve hareketsizlik gibi belirtilerle kendini gösterebilir. Bu tür belirtiler görüldüğünde veteriner kontrolü sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snakeCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'snakeCare' && (
          <Text style={styles.text}>
            {'\u2022'} Yılanlar için uygun sıcaklık ve nem seviyelerinin sağlanması çok önemlidir. Ayrıca, akvaryumlarının düzenli olarak temizlenmesi gerekmektedir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snakeTravel')}>
          <Text style={styles.boldText}>Yılanlarla Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'snakeTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Yılanlar taşınma sırasında strese girebilirler. Güvenli bir taşıma kabı kullanarak ve yolculuk boyunca uygun sıcaklıkta tutarak seyahat etmelerini sağlayabilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snakeGrooming')}>
          <Text style={styles.boldText}>Yılanlarınızın Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'snakeGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Yılanlar tüyleri olmadığı için onların bakımında deri değişimi ve nemlendirme en önemli faktörlerdir. Deri değişimi sırasında yılanın rahat bir ortamda olması sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snakeTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'snakeTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Yılanlar için eğitim genellikle mümkün olmasa da, beslenme zamanlamaları ve akvaryum düzenlemeleri ile onların davranışlarını şekillendirebilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snakeToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'snakeToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Yılanlar için özel bir tuvalet eğitimi yoktur, ancak akvaryum temizliği düzenli olarak yapılmalıdır.
          </Text>
        )}
      </View>

      
      <View style={styles.section}>
        <Image 
          source={require('../assets/ciivciv.jpg')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.chickText]}>Civciv Bakımı</Text>
        <TouchableOpacity onPress={() => toggleSection('chickPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'chickPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Civcivler için oyuncaklar ve oyunlar, onların enerjilerini atmalarına yardımcı olabilir. Küçük toplar ve zilli oyuncaklar onları meşgul eder.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chickHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'chickHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Civcivler, uygun olmayan beslenme, soğuk hava ve hijyen eksiklikleri nedeniyle hastalanabilirler. Sağlıklı bir büyüme için doğru beslenme ve sıcaklık sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chickSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'chickSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Civcivlerde sağlık sorunları iştahsızlık, halsizlik ve tüy dökülmesi gibi belirtilerle kendini gösterebilir. Bu belirtiler görüldüğünde veteriner kontrolü sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chickCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'chickCare' && (
          <Text style={styles.text}>
            {'\u2022'} Civcivler için sıcak bir ortam ve temiz bir yaşam alanı sağlanmalıdır. Su ve yem kapları düzenli olarak temizlenmelidir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chickTravel')}>
          <Text style={styles.boldText}>Civcivlerle Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'chickTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Civcivler taşınma sırasında strese girebilirler. Güvenli bir taşıma kabı kullanarak ve yolculuk boyunca uygun sıcaklıkta tutarak seyahat etmelerini sağlayabilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chickGrooming')}>
          <Text style={styles.boldText}>Civcivlerinizin Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'chickGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Civcivler tüy bakımı gerektirmez, ancak tüy değişim dönemlerinde dikkatli olunmalı ve hijyen sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chickTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'chickTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Civcivler için eğitim genellikle mümkün olmasa da, beslenme zamanlamaları ve yaşam alanı düzenlemeleri ile onların davranışlarını şekillendirebilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chickToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'chickToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Civcivler için özel bir tuvalet eğitimi yoktur, ancak yaşam alanlarının temizliği düzenli olarak yapılmalıdır.
          </Text>
        )}
      </View>

      
      <View style={styles.section}>
        <Image 
          source={require('../assets/bukalemun.jpg')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.chameleonText]}>Bukalemun Bakımı</Text>
        <TouchableOpacity onPress={() => toggleSection('chameleonPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'chameleonPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Bukalemunlar için oyunlar ve oyuncaklar, onların doğal davranışlarını teşvik etmek için önemlidir. Akvaryumlarında tırmanabilecekleri dallar ve gizlenebilecekleri alanlar sağlanabilir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chameleonHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'chameleonHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Bukalemunlar, parazitler, beslenme eksiklikleri ve uygun olmayan yaşam koşulları nedeniyle hastalanabilirler. Düzenli olarak veteriner kontrolü yapılmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chameleonSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'chameleonSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Bukalemunlarda sağlık sorunları iştahsızlık, deri problemleri ve hareketsizlik gibi belirtilerle kendini gösterebilir. Bu tür belirtiler görüldüğünde veteriner kontrolü sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chameleonCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'chameleonCare' && (
          <Text style={styles.text}>
            {'\u2022'} Bukalemunlar için uygun sıcaklık ve nem seviyelerinin sağlanması çok önemlidir. Ayrıca, akvaryumlarının düzenli olarak temizlenmesi gerekmektedir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chameleonTravel')}>
          <Text style={styles.boldText}>Bukalemunlarla Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'chameleonTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Bukalemunlar taşınma sırasında strese girebilirler. Güvenli bir taşıma kabı kullanarak ve yolculuk boyunca uygun sıcaklıkta tutarak seyahat etmelerini sağlayabilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chameleonGrooming')}>
          <Text style={styles.boldText}>Bukalemunlarınızın Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'chameleonGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Bukalemunlar tüyleri olmadığı için onların bakımında deri değişimi ve nemlendirme en önemli faktörlerdir. Deri değişimi sırasında bukalemunların rahat bir ortamda olması sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chameleonTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'chameleonTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Bukalemunlar için eğitim genellikle mümkün olmasa da, beslenme zamanlamaları ve akvaryum düzenlemeleri ile onların davranışlarını şekillendirebilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('chameleonToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'chameleonToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Bukalemunlar için özel bir tuvalet eğitimi yoktur, ancak akvaryum temizliği düzenli olarak yapılmalıdır.
          </Text>
        )}
      </View>

      
      <View style={styles.section}>
        <Image 
          source={require('../assets/kaplumbağa.jpg')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.turtleText]}>Kaplumbağa Bakımı</Text>
        <TouchableOpacity onPress={() => toggleSection('turtlePlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'turtlePlay' && (
          <Text style={styles.text}>
            {'\u2022'} Kaplumbağalar için oyunlar ve oyuncaklar, onların doğal davranışlarını teşvik etmek için önemlidir. Akvaryumlarında yüzebilecekleri alanlar ve tırmanabilecekleri kayalar sağlanabilir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('turtleHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'turtleHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Kaplumbağalar, parazitler, beslenme eksiklikleri ve uygun olmayan yaşam koşulları nedeniyle hastalanabilirler. Düzenli olarak veteriner kontrolü yapılmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('turtleSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'turtleSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Kaplumbağalarda sağlık sorunları iştahsızlık, kabuk problemleri ve hareketsizlik gibi belirtilerle kendini gösterebilir. Bu tür belirtiler görüldüğünde veteriner kontrolü sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('turtleCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'turtleCare' && (
          <Text style={styles.text}>
            {'\u2022'} Kaplumbağalar için uygun sıcaklık ve su kalitesinin sağlanması çok önemlidir. Ayrıca, akvaryumlarının düzenli olarak temizlenmesi gerekmektedir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('turtleTravel')}>
          <Text style={styles.boldText}>Kaplumbağalarla Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'turtleTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Kaplumbağalar taşınma sırasında strese girebilirler. Güvenli bir taşıma kabı kullanarak ve yolculuk boyunca uygun sıcaklıkta tutarak seyahat etmelerini sağlayabilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('turtleGrooming')}>
          <Text style={styles.boldText}>Kaplumbağalarınızın Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'turtleGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Kaplumbağalar tüyleri olmadığı için onların bakımında kabuk temizliği ve nemlendirme en önemli faktörlerdir. Kabuk temizliği sırasında kaplumbağaların rahat bir ortamda olması sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('turtleTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'turtleTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Kaplumbağalar için eğitim genellikle mümkün olmasa da, beslenme zamanlamaları ve akvaryum düzenlemeleri ile onların davranışlarını şekillendirebilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('turtleToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'turtleToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Kaplumbağalar için özel bir tuvalet eğitimi yoktur, ancak akvaryum temizliği düzenli olarak yapılmalıdır.
          </Text>
        )}
      </View>

      
      <View style={styles.section}>
        <Image 
          source={require('../assets/kertenkele.jpg')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.lizardText]}>Kertenkele Bakımı</Text>
        <TouchableOpacity onPress={() => toggleSection('lizardPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'lizardPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Kertenkeleler için oyunlar ve oyuncaklar, onların doğal davranışlarını teşvik etmek için önemlidir. Akvaryumlarında tırmanabilecekleri dallar ve gizlenebilecekleri alanlar sağlanabilir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('lizardHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'lizardHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Kertenkeleler, parazitler, beslenme eksiklikleri ve uygun olmayan yaşam koşulları nedeniyle hastalanabilirler. Düzenli olarak veteriner kontrolü yapılmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('lizardSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'lizardSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Kertenkelelerde sağlık sorunları iştahsızlık, deri problemleri ve hareketsizlik gibi belirtilerle kendini gösterebilir. Bu tür belirtiler görüldüğünde veteriner kontrolü sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('lizardCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'lizardCare' && (
          <Text style={styles.text}>
            {'\u2022'} Kertenkeleler için uygun sıcaklık ve nem seviyelerinin sağlanması çok önemlidir. Ayrıca, akvaryumlarının düzenli olarak temizlenmesi gerekmektedir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('lizardTravel')}>
          <Text style={styles.boldText}>Kertenkelelerle Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'lizardTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Kertenkeleler taşınma sırasında strese girebilirler. Güvenli bir taşıma kabı kullanarak ve yolculuk boyunca uygun sıcaklıkta tutarak seyahat etmelerini sağlayabilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('lizardGrooming')}>
          <Text style={styles.boldText}>Kertenkelelerinizin Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'lizardGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Kertenkeleler tüyleri olmadığı için onların bakımında deri değişimi ve nemlendirme en önemli faktörlerdir. Deri değişimi sırasında kertenkelelerin rahat bir ortamda olması sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('lizardTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'lizardTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Kertenkeleler için eğitim genellikle mümkün olmasa da, beslenme zamanlamaları ve akvaryum düzenlemeleri ile onların davranışlarını şekillendirebilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('lizardToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'lizardToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Kertenkeleler için özel bir tuvalet eğitimi yoktur, ancak akvaryum temizliği düzenli olarak yapılmalıdır.
          </Text>
        )}
      </View>

      
      <View style={styles.section}>
        <Image 
          source={require('../assets/salyangoz.webp')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.snailText]}>Salyangoz Bakımı</Text>
        <TouchableOpacity onPress={() => toggleSection('snailPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'snailPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Salyangozlar için oyunlar ve oyuncaklar, onların doğal davranışlarını teşvik etmek için önemlidir. Terraryumlarında tırmanabilecekleri dallar ve gizlenebilecekleri alanlar sağlanabilir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snailHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'snailHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Salyangozlar, parazitler, beslenme eksiklikleri ve uygun olmayan yaşam koşulları nedeniyle hastalanabilirler. Düzenli olarak kontrol yapılmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snailSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'snailSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Salyangozlarda sağlık sorunları iştahsızlık, kabuk problemleri ve hareketsizlik gibi belirtilerle kendini gösterebilir. Bu tür belirtiler görüldüğünde kontrol edilmelidir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snailCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'snailCare' && (
          <Text style={styles.text}>
            {'\u2022'} Salyangozlar için uygun nem seviyelerinin sağlanması çok önemlidir. Ayrıca, terraryumlarının düzenli olarak temizlenmesi gerekmektedir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snailTravel')}>
          <Text style={styles.boldText}>Salyangozlarla Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'snailTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Salyangozlar taşınma sırasında strese girebilirler. Güvenli bir taşıma kabı kullanarak ve yolculuk boyunca uygun nem seviyesinde tutarak seyahat etmelerini sağlayabilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snailGrooming')}>
          <Text style={styles.boldText}>Salyangozlarınızın Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'snailGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Salyangozlar tüyleri olmadığı için onların bakımında kabuk temizliği ve nemlendirme en önemli faktörlerdir. Kabuk temizliği sırasında salyangozların rahat bir ortamda olması sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snailTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'snailTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Salyangozlar için eğitim genellikle mümkün olmasa da, beslenme zamanlamaları ve terraryum düzenlemeleri ile onların davranışlarını şekillendirebilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('snailToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'snailToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Salyangozlar için özel bir tuvalet eğitimi yoktur, ancak terraryum temizliği düzenli olarak yapılmalıdır.
          </Text>
        )}
      </View>

      
      <View style={styles.section}>
        <Image 
          source={require('../assets/solucan2.jpg')} 
          style={styles.image} 
        />
        <Text style={[styles.subHeader, styles.wormText]}>Solucan Bakımı</Text>
        <TouchableOpacity onPress={() => toggleSection('wormPlay')}>
          <Text style={styles.boldText}>Oyunlar ve Oyuncaklar</Text>
        </TouchableOpacity>
        {expandedSection === 'wormPlay' && (
          <Text style={styles.text}>
            {'\u2022'} Solucanlar için oyunlar ve oyuncaklar, onların doğal davranışlarını teşvik etmek için önemlidir. Terraryumlarında kazabilecekleri toprak ve gizlenebilecekleri alanlar sağlanabilir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('wormHealth')}>
          <Text style={styles.boldText}>Hastalık Nedenleri</Text>
        </TouchableOpacity>
        {expandedSection === 'wormHealth' && (
          <Text style={styles.text}>
            {'\u2022'} Solucanlar, parazitler, beslenme eksiklikleri ve uygun olmayan yaşam koşulları nedeniyle hastalanabilirler. Düzenli olarak kontrol yapılmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('wormSymptoms')}>
          <Text style={styles.boldText}>Belirti ve Semptomlar</Text>
        </TouchableOpacity>
        {expandedSection === 'wormSymptoms' && (
          <Text style={styles.text}>
            {'\u2022'} Solucanlarda sağlık sorunları iştahsızlık, hareketsizlik ve toprağın yapısındaki değişikliklerle kendini gösterebilir. Bu tür belirtiler görüldüğünde kontrol edilmelidir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('wormCare')}>
          <Text style={styles.boldText}>Düzgün Ev Bakımı</Text>
        </TouchableOpacity>
        {expandedSection === 'wormCare' && (
          <Text style={styles.text}>
            {'\u2022'} Solucanlar için uygun nem seviyelerinin sağlanması çok önemlidir. Ayrıca, terraryumlarının düzenli olarak temizlenmesi gerekmektedir.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('wormTravel')}>
          <Text style={styles.boldText}>Solucanlarla Seyahat</Text>
        </TouchableOpacity>
        {expandedSection === 'wormTravel' && (
          <Text style={styles.text}>
            {'\u2022'} Solucanlar taşınma sırasında strese girebilirler. Güvenli bir taşıma kabı kullanarak ve yolculuk boyunca uygun nem seviyesinde tutarak seyahat etmelerini sağlayabilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('wormGrooming')}>
          <Text style={styles.boldText}>Solucanlarınızın Tüylerini Tarama</Text>
        </TouchableOpacity>
        {expandedSection === 'wormGrooming' && (
          <Text style={styles.text}>
            {'\u2022'} Solucanlar tüyleri olmadığı için onların bakımında toprak temizliği ve nemlendirme en önemli faktörlerdir. Toprak temizliği sırasında solucanların rahat bir ortamda olması sağlanmalıdır.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('wormTraining')}>
          <Text style={styles.boldText}>Eğitimle İlgili Temel İlkeler</Text>
        </TouchableOpacity>
        {expandedSection === 'wormTraining' && (
          <Text style={styles.text}>
            {'\u2022'} Solucanlar için eğitim genellikle mümkün olmasa da, beslenme zamanlamaları ve terraryum düzenlemeleri ile onların davranışlarını şekillendirebilirsiniz.
          </Text>
        )}
        <TouchableOpacity onPress={() => toggleSection('wormToilet')}>
          <Text style={styles.boldText}>Tuvalet Eğitimi</Text>
        </TouchableOpacity>
        {expandedSection === 'wormToilet' && (
          <Text style={styles.text}>
            {'\u2022'} Solucanlar için özel bir tuvalet eğitimi yoktur, ancak terraryum temizliği düzenli olarak yapılmalıdır.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 10,
    borderRadius: 10,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dogText: {
    color: '#FF6347', 
  },
  catText: {
    color: '#FF6347', 
  },
  birdText: {
    color: '#1E90FF', 
  },
  fishText: {
    color: '#20B2AA', 
  },
  hamsterText: {
    color: '#DAA520', 
  },
  rabbitText: {
    color: '#8A2BE2', 
  },
  snakeText: {
    color: '#4B0082', 
  },
  chickText: {
    color: '#FFD700',
  },
  chameleonText: {
    color: '#32CD32', 
  },
  turtleText: {
    color: '#228B22', 
  },
  lizardText: {
    color: '#8B4513', 
  },
  snailText: {
    color: '#696969', 
  },
  wormText: {
    color: '#800000', 
  },
  boldText: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  donationHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default PetCare;
