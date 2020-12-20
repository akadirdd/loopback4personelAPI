# loopback4personelAPI

Authorize örnek token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4MjliNGNhLTE1ODgtNDM4ZC1hMGM1LWU3OTM5YjhmYmYzMCIsIm5hbWUiOiJjYW5vIiwiZW1haWwiOiJjYW5vQG1haWwuY29tIiwiaWF0IjoxNjA4NDY1NDYyLCJleHAiOjE2MDg0ODcwNjJ9.y5Ei0NAOZMNxdI2mWIBseaZNURme_vLDUuAXDA7kafg

-------------------------------------------------------------------------------------------------

1. Yeni bir çalışan bilgisi kaydedebilmek  
	- PersonelController içerisinde POST /personels  
  
2. Şirketin çalışanlarını listelemek  
	- PersonelController içerisinde GET /personels
  
3. Bir çalışana ait bilgileri güncellemek  
	- PersonelController içerisinde PUT /personels/{id}  
	- PersonelController içerisinde PATCH /personels/{id}  
  
4. Yöneticilerin çalışanlarını hiyerarşik şekilde listelemek  
	- PersonelController içerisinde GET /personels/hiyerarsik/{id}  
  
5. Departmanların maaş ortalamalarını programatik şekilde hesaplayan servis (veri tabanında hesaplanmasın)  
	- PersonelController içerisinde GET /personels/ortalama  
  
6. Çalışanın unvan bilgilerini değiştirmek  
	- PersonelUnvanController içerisinde  
		* PATCH /personels/{id}/unvans  
			+ Örnek kullanım: ID'si 5 olan personelin ID'si 12 olan unvanının bitis tarihini güncelle  
				param.id = 5  
				RequestBody = {  
  								"id": 12,  
 								"bitis_tarih": "2020-12-18T12:37:16.871Z"  
				    	  		}  
		* POST /personels/{id}/unvans  
			+ Örnek kullanım: ID'si 5 olan personele, RequestBody içerisinde özellikleri belirtilen unvanı ekle  
				param.id = 5  
				RequestBody = {  
  						"baslangic_tarih": "2020-12-20T12:51:10.738Z",  
  						"unvan_isim": "seniordev",  
  						"personel_id": 5,  
 					        "departman_id": 2  
					      }  

7. Çalışan bilgilerini unvan tarihçesiyle göstermek  
	- PersonelController içerisinde GET /personels/withUnvan/{id}  
  
8. Şirketin departmanlarını yönetmek  
	- DepartmanController içerisinde  
  
9. Şirketin ofis bilgilerini yönetmek  
	- OfisController içerisinde  
  
### Controller Bilgileri
  
1. DepartmanController  
	- Genel olarak departman tablosu üzerinde işlemleri yönetir.  
	- Özel olarak  
		* GET /departman/{id}/manager : Departmanın manager bilgilerini döndürür.
		* GET /departman/{id}/ofis : Departmanın ofis bilgilerini döndürür.  
  
2. DepartmanPersonelController  
	- Genel olarak belirli bir departmanın personellerini yönetir.  
  
3. DepartmanUnvanController  
	- Genel olarak belirli bir departmanın unvanlarını yönetir.  
  
4. LocationBoxController  
	- Uzak locationbox.com.tr sunucularındaki lokasyon bilgilerini yönetir.  
  
5. PersonelDepartmanController  
	- Personelin yöneticilik yaptığı departmanı yönetir.  
  
6. OfisController  
	- Genel olarak ofis tablosu üzerinde işlemleri yönetir.  
  
7. OfisDepartmanController  
	- Belirli bir ofis lokasyonundaki departmanları yönetir.  
  
8. PersonelController  
	- Genel olarak personel tablosu üzerinde işlemleri yönetir.  
	- Özel olarak  
		* GET /personels/hiyerarsik/{id} : ID'si verilen yöneticinin altındaki diğer yöneticileri ve personeli iç içe hiyerarşik bir şekilde döndürür.  
		* GET /personels/ortalama : Departmanların maaş ortalamalarını döndürür.  
		* GET /personels/withUnvan/{id} : Çalışan bilgilerini unvan tarihçesiyle döndürür.  
		* GET /personels/{id}/manager : Çalışanın yönetici bilgilerini döndürür.  
  
9. PersonelUnvanController  
	- Genel olarak belirli bir personelin unvanlarını yönetir.  
		* PATCH /personels/{id}/unvans  
			+ Örnek kullanım: ID'si 5 olan personelin ID'si 12 olan unvanının bitis tarihini güncelle  
				param.id = 5  
				RequestBody = {  
  						"id": 12,  
 						"bitis_tarih": "2020-12-18T12:37:16.871Z"  
				    	  }  
		* POST /personels/{id}/unvans  
			+ Örnek kullanım: ID'si 5 olan personele, RequestBody içerisinde özellikleri belirtilen unvanı ekle  
				param.id = 5  
				RequestBody = {  
  						"baslangic_tarih": "2020-12-20T12:51:10.738Z",  
  						"unvan_isim": "seniordev",  
  						"personel_id": 5,  
 					        "departman_id": 2  
					      }  
  
10. UserController  
	- JWT authentication ve Authorization işlemlerini gerçekleştirir.  
		* POST /signup : Sisteme üye olunur.  
			RequestBody : {  
  					"username": "string",  
  					"email": "string",  
  					"password": "string", //şifre en az 8 karakter olmalıdır.  
  				      }  
		* POST /users/login : Sisteme giriş yapılarak Authorization token döndürür.  
			RequestBody : {  
  					"email": "user@example.com",  
  					"password": "string",  
  				      }  
			Response : {  
  				      "token": "string"  
				   }  
  
11. UnvanController  
	- Genel olarak unvan tablosu üzerinde işlemleri yönetir.  
	- Özel olarak  
		* GET /unvans/{id}/departman : Unvanın kayıtlı olduğu departman bilgilerini döndürür.  
		* GET /unvans/{id}/personel : Unvanın kayıtlı olduğu personel bilgilerini döndürür.  
		
