from django.test import TestCase
from urllib.parse import urlparse
from http import HTTPStatus
from lasvegas.models import Wallet, Movement
from django.shortcuts import resolve_url
from django.contrib.auth import get_user_model
from lasvegas.tests import create_user

# Create your tests here.

class WalletTest(TestCase):

    def test_new_user_should_have_a_wallet(self):
        User = get_user_model()
        user = User.objects.create(
            username='user',
            email='user@localhost',
        )
        self.assertIsNotNone(user.wallet)
        wallet = user.wallet
        self.assertEqual(wallet.quantity, 0.)

    def test_movement_should_change_wallet(self):
        wallet  = Wallet.objects.create()
        self.assertEqual(wallet.quantity, 0.)
        Movement.objects.create(
            wallet=wallet,
            description='test',
            value=1.,
        )
        wallet = Wallet.objects.get(pk=wallet.pk)
        self.assertEqual(wallet.quantity, 1.)
        

class AnonymousWalletViewsTest(TestCase):
        def test_my_wallet(self):
            url = resolve_url('lasvegas:my-wallet')
            response = self.client.get(url)
            self.assertEqual(response.status_code, HTTPStatus.FOUND)
            parsed_url = urlparse(response.url)
            self.assertEqual(parsed_url.query, 'next=' + url)
            self.assertEqual(parsed_url.path,  '/accounts/login/')

class AuthWalletViewsTest(TestCase):
    def test_my_wallet(self):
        login_user = create_user()
        self.client.force_login(login_user)
        url = resolve_url('lasvegas:my-wallet')
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.context['object'], login_user.wallet)
