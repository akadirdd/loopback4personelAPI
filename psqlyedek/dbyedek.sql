PGDMP         1                x            atezytdatabase    13.1    13.1 .    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16424    atezytdatabase    DATABASE     k   CREATE DATABASE atezytdatabase WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Turkish_Turkey.1254';
    DROP DATABASE atezytdatabase;
                postgres    false            �            1259    16435 	   departman    TABLE     �   CREATE TABLE public.departman (
    id integer NOT NULL,
    ad character varying(60) NOT NULL,
    manager_id integer,
    lokasyon_id integer,
    locationbox_lokasyon_id integer
);
    DROP TABLE public.departman;
       public         heap    postgres    false            �            1259    16433    departman_id_seq    SEQUENCE     �   CREATE SEQUENCE public.departman_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.departman_id_seq;
       public          postgres    false    203            �           0    0    departman_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.departman_id_seq OWNED BY public.departman.id;
          public          postgres    false    202            �            1259    16443    ofis    TABLE     �   CREATE TABLE public.ofis (
    id integer NOT NULL,
    isim character varying(60) NOT NULL,
    adresi text NOT NULL,
    postakodu integer,
    sehir character varying(20) NOT NULL,
    ulke character varying(50)
);
    DROP TABLE public.ofis;
       public         heap    postgres    false            �            1259    16441    ofis_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ofis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.ofis_id_seq;
       public          postgres    false    205            �           0    0    ofis_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.ofis_id_seq OWNED BY public.ofis.id;
          public          postgres    false    204            �            1259    16427    personel    TABLE     7  CREATE TABLE public.personel (
    id integer NOT NULL,
    ad character varying(30) NOT NULL,
    soyad character varying(30) NOT NULL,
    eposta character varying(50) NOT NULL,
    telefon character varying(15),
    ise_giris_tarih date,
    maas integer,
    departman_id integer,
    manager_id integer
);
    DROP TABLE public.personel;
       public         heap    postgres    false            �            1259    16425    personel_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.personel_id_seq;
       public          postgres    false    201            �           0    0    personel_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.personel_id_seq OWNED BY public.personel.id;
          public          postgres    false    200            �            1259    16454    unvan    TABLE     �   CREATE TABLE public.unvan (
    id integer NOT NULL,
    baslangic_tarih date NOT NULL,
    bitis_tarih date,
    unvan_isim character varying(50) NOT NULL,
    departman_id integer NOT NULL,
    personel_id integer
);
    DROP TABLE public.unvan;
       public         heap    postgres    false            �            1259    16452    unvan_id_seq    SEQUENCE     �   CREATE SEQUENCE public.unvan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.unvan_id_seq;
       public          postgres    false    207            �           0    0    unvan_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.unvan_id_seq OWNED BY public.unvan.id;
          public          postgres    false    206            �            1259    16572    user    TABLE     �   CREATE TABLE public."user" (
    id uuid NOT NULL,
    realm text,
    username text,
    email text NOT NULL,
    emailverified boolean,
    verificationtoken text
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    16580    usercredentials    TABLE     t   CREATE TABLE public.usercredentials (
    id uuid NOT NULL,
    password text NOT NULL,
    userid text NOT NULL
);
 #   DROP TABLE public.usercredentials;
       public         heap    postgres    false            @           2604    16438    departman id    DEFAULT     l   ALTER TABLE ONLY public.departman ALTER COLUMN id SET DEFAULT nextval('public.departman_id_seq'::regclass);
 ;   ALTER TABLE public.departman ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            A           2604    16446    ofis id    DEFAULT     b   ALTER TABLE ONLY public.ofis ALTER COLUMN id SET DEFAULT nextval('public.ofis_id_seq'::regclass);
 6   ALTER TABLE public.ofis ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            ?           2604    16430    personel id    DEFAULT     j   ALTER TABLE ONLY public.personel ALTER COLUMN id SET DEFAULT nextval('public.personel_id_seq'::regclass);
 :   ALTER TABLE public.personel ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            B           2604    16457    unvan id    DEFAULT     d   ALTER TABLE ONLY public.unvan ALTER COLUMN id SET DEFAULT nextval('public.unvan_id_seq'::regclass);
 7   ALTER TABLE public.unvan ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �          0    16435 	   departman 
   TABLE DATA           ]   COPY public.departman (id, ad, manager_id, lokasyon_id, locationbox_lokasyon_id) FROM stdin;
    public          postgres    false    203   2       �          0    16443    ofis 
   TABLE DATA           H   COPY public.ofis (id, isim, adresi, postakodu, sehir, ulke) FROM stdin;
    public          postgres    false    205   �2       �          0    16427    personel 
   TABLE DATA           s   COPY public.personel (id, ad, soyad, eposta, telefon, ise_giris_tarih, maas, departman_id, manager_id) FROM stdin;
    public          postgres    false    201   3       �          0    16454    unvan 
   TABLE DATA           h   COPY public.unvan (id, baslangic_tarih, bitis_tarih, unvan_isim, departman_id, personel_id) FROM stdin;
    public          postgres    false    207   4       �          0    16572    user 
   TABLE DATA           ^   COPY public."user" (id, realm, username, email, emailverified, verificationtoken) FROM stdin;
    public          postgres    false    208   �4       �          0    16580    usercredentials 
   TABLE DATA           ?   COPY public.usercredentials (id, password, userid) FROM stdin;
    public          postgres    false    209   �5       �           0    0    departman_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.departman_id_seq', 3, true);
          public          postgres    false    202            �           0    0    ofis_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.ofis_id_seq', 2, true);
          public          postgres    false    204            �           0    0    personel_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.personel_id_seq', 9, true);
          public          postgres    false    200            �           0    0    unvan_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.unvan_id_seq', 13, true);
          public          postgres    false    206            H           2606    16440    departman departman_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.departman
    ADD CONSTRAINT departman_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.departman DROP CONSTRAINT departman_pkey;
       public            postgres    false    203            K           2606    16451    ofis ofis_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.ofis
    ADD CONSTRAINT ofis_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.ofis DROP CONSTRAINT ofis_pkey;
       public            postgres    false    205            F           2606    16432    personel personel_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.personel
    ADD CONSTRAINT personel_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.personel DROP CONSTRAINT personel_pkey;
       public            postgres    false    201            O           2606    16459    unvan unvan_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.unvan
    ADD CONSTRAINT unvan_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.unvan DROP CONSTRAINT unvan_pkey;
       public            postgres    false    207            Q           2606    16589    user user_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_email_key;
       public            postgres    false    208            S           2606    16579    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    208            U           2606    16587 $   usercredentials usercredentials_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.usercredentials
    ADD CONSTRAINT usercredentials_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.usercredentials DROP CONSTRAINT usercredentials_pkey;
       public            postgres    false    209            I           1259    16483    fki_fk_departman_yonetici_id    INDEX     X   CREATE INDEX fki_fk_departman_yonetici_id ON public.departman USING btree (manager_id);
 0   DROP INDEX public.fki_fk_departman_yonetici_id;
       public            postgres    false    203            C           1259    16465    fki_fk_personel_departmanId    INDEX     Z   CREATE INDEX "fki_fk_personel_departmanId" ON public.personel USING btree (departman_id);
 1   DROP INDEX public."fki_fk_personel_departmanId";
       public            postgres    false    201            D           1259    16477    fki_fk_personel_yonetici_id    INDEX     V   CREATE INDEX fki_fk_personel_yonetici_id ON public.personel USING btree (manager_id);
 /   DROP INDEX public.fki_fk_personel_yonetici_id;
       public            postgres    false    201            L           1259    16495    fki_fk_unvan_departman_id    INDEX     S   CREATE INDEX fki_fk_unvan_departman_id ON public.unvan USING btree (departman_id);
 -   DROP INDEX public.fki_fk_unvan_departman_id;
       public            postgres    false    207            M           1259    16516    fki_fk_unvan_personel_id    INDEX     Q   CREATE INDEX fki_fk_unvan_personel_id ON public.unvan USING btree (personel_id);
 ,   DROP INDEX public.fki_fk_unvan_personel_id;
       public            postgres    false    207            V           2606    16506    unvan fk_unvan_departman_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.unvan
    ADD CONSTRAINT fk_unvan_departman_id FOREIGN KEY (departman_id) REFERENCES public.departman(id) NOT VALID;
 E   ALTER TABLE ONLY public.unvan DROP CONSTRAINT fk_unvan_departman_id;
       public          postgres    false    203    207    2888            W           2606    16511    unvan fk_unvan_personel_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.unvan
    ADD CONSTRAINT fk_unvan_personel_id FOREIGN KEY (personel_id) REFERENCES public.personel(id) NOT VALID;
 D   ALTER TABLE ONLY public.unvan DROP CONSTRAINT fk_unvan_personel_id;
       public          postgres    false    201    2886    207            �   A   x�3�L��O�N�H���4ASsCS.#δ����ԼNc$ac��Լ̔�N#�h�W� �t�      �   8   x�3�t�KT�O�,��M,�I��46100�<���$1/�4�3�����T�=... |��      �   �   x��бj�0���_d�d?��
�.�����嵈F�r@8��g2v�7����1�vrm羫kQ�Cp-^���k�����K�O!i#�d3ι,`��aMJ6R)�RK��qq�4c;�k�|��\�"/�)4�۬;w�/.��%n�6�)p�rT�(-6�?:Ֆ�SEx�x>b3�1}7��������v��T!�U!W%>]���%��߮c�=bz���g�y�d5�3�o����R����      �   �   x�u��� ���S�hإ<���4J����_@R鏷	�efd$Pq�8VA�$;W^��އ�:��r��]�O��W�a�$Hp����n���U<ھ�&v4G�?��Z������ԭ9�k�������*��l0!g������lV(��1��Ɂ���&E��DU����X�Ӏ2��@E�)���z�      �   �   x�e�M�@�5ܥ����8'`��c"�W�^%n��{�K��F��h0�Q<H�[ȭ�Q7O�}�G��U�����g���{\2f��M Z̠l�Z-�)����*� 4����@%�d����Ɵ�j�����xB�<k���"���`M`�+-�<��#��<�}�yL�      �   C  x�5λRA@ј�ҦfgzB��"�U�*��<z��j��nbz�{�0Y#��� A��8f�>��z}����͘~矇��w/�k}3+�`f��|I��M��O���j�rsj�C�[������b�P&�Bk[8���@P��t�kI)�����!��mc��u+~�kS�>�0x&�\C�l��zGg�����i�_���R$���`D�FC��,]������	�u5��9*p�w �JKْ�g̪���r�立��pU}NX_קm:�j�N�au{��q�t��i;��=r�F��T.�Q[R\Y��mP���r�     