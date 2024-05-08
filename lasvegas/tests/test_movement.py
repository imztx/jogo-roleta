from django.test import TestCase
from urllib.parse import urlparse
from http import HTTPStatus
from lasvegas.models import Wallet, Movement
from django.shortcuts import resolve_url
from lasvegas.tests import create_user_without_movements

# Create your tests here.


class AnonymousWMovementViewsTest(TestCase):

    def test_my_movement(self):
        url = resolve_url('lasvegas:my-movement-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        parsed_url = urlparse(response.url)
        self.assertEqual(parsed_url.query, 'next=' + url)
        self.assertEqual(parsed_url.path,  '/accounts/login/')


class AuthMovementViewsTest(TestCase):

    def test_my_movement_should_be_empty(self):
        login_user = create_user_without_movements()
        self.client.force_login(login_user)
        url = resolve_url('lasvegas:my-movement-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(list(response.context['object_list']), [])

    def test_my_movement_should_retrieve_my_data(self):
        login_user = create_user_without_movements()
        self.client.force_login(login_user)
        url = resolve_url('lasvegas:my-movement-list')
        m1 = Movement.objects.create(
            wallet=login_user.wallet,
            description='m1',
            value=10,
        )
        m2 = Movement.objects.create(
            wallet=login_user.wallet,
            description='m2',
            value=-10,
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(list(response.context['object_list']), [m1, m2])

    def test_my_movement_should_not_retrieve_other_data(self):
        login_user = create_user_without_movements()
        other_user = create_user_without_movements()
        self.client.force_login(login_user)
        url = resolve_url('lasvegas:my-movement-list')
        m1 = Movement.objects.create(
            wallet=other_user.wallet,
            description='m1',
            value=10,
        )
        m2 = Movement.objects.create(
            wallet=other_user.wallet,
            description='m2',
            value=-10,
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(list(response.context['object_list']), [])
