from rest_framework import serializers
from .models import CartItem, Product,Category,Cart
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
        
class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)
    product_image = serializers.ImageField(source='product.image', read_only=True)
    
    class Meta:
        model = CartItem
        fields = '__all__'
        
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = '__all__'
        
    def get_total(self, obj):
        return sum(item.product.price * item.quantity for item in obj.items.all())
    
    
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id','username','email']
        

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username','email','password','confirm_password']
        
    def validate(self,data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Password do not match.")
        return data
    
    def create(self,validated_data):
        username = validated_data['username']
        email = validated_data.get('email','')
        password=validated_data['password']
        user = User.objects.create_user(username=username,email=email,password=password)
        return user