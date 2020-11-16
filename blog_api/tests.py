from django.urls import reverse, resolve
from rest_framework.test import APITestCase
from blog_api.views import PostList, PostDetail
from accounts.models import User


class TestBlogUrls(APITestCase):

    def test_detail_create_url(self):
        url = reverse('blog_api:detail_create', args=[1])
        self.assertEqual(resolve(url).func.__name__, PostDetail.as_view().__name__)

    def test_list_create_urls(self):
        url = reverse('blog_api:list_create')
        self.assertEqual(resolve(url).func.__name__, PostList.as_view().__name__)


class TestBlogViews(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='guideme@gmail.com',
            username='guideme',
            languages='english',
            email_confirm=True,
            is_guide=True,
            is_tourist=False,
        )
        self.user.save()

        self.post_create_data = {
            'place': 'test_place',
            'details': 'test_details',
            'review': 'test_review',
            'id': 1,
            'author': 1,
        }
        self.post_update_data = {
            'place': 'test_place',
            'details': 'test_details_updated',
            'review': 'test_review_updated',
            'id': 1,
            'author': 1,
        }
        self.post_list_url = reverse('blog_api:list_create')
        self.post_detail_url = reverse('blog_api:detail_create', args=[1])

    def test_post_list_view(self):
        response = self.client.get(self.post_list_url)
        self.assertEqual(response.status_code, 200)

    def test_create_post_list_view(self):
        response = self.client.post(self.post_list_url, self.post_create_data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_update_post_detail_view(self):
        self.client.post(self.post_list_url, self.post_create_data, format='json')
        response = self.client.put(self.post_detail_url, self.post_update_data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_delete_post_detail_view(self):
        self.client.post(self.post_list_url, self.post_create_data, format='json')
        response = self.client.delete(self.post_detail_url)
        self.assertEqual(response.status_code, 204)

    def test_post_detail_view(self):
        self.client.post(self.post_list_url, self.post_create_data, format='json')
        response = self.client.get(self.post_detail_url)
        self.assertEqual(response.status_code, 200)
