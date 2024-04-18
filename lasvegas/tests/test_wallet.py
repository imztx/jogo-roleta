from django.test import TestCase
from http import HTTPStatus
from django.shortcuts import resolve_url
from django.contrib.auth import get_user_model

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

class WalletViewsTest(TestCase):

    def test_my_wallet(self):
        url = resolve_url('lasvegas:my-wallet')
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)      