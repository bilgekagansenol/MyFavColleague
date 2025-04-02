from rest_framework import serializers

from profiles import models



class UserProfileSerializer(serializers.ModelSerializer):
        """Serializes  a user profle object"""

    
        class Meta:
            model = models.UserProfile
            fields= ('id' , ' email' , 'name', 'password')
            extra_kwargs = {
                  'password': {
                        'write_only': True,
                        'style': {'input_type': 'password'}
                  }
            }

        def create(self, validated_data):
              """Create and return new user"""
              user = models.UserProfile.objects.create_user(
                    email = validated_data['email'],
                    name = validated_data['name'],
                    password = validated_data['password']
              )

        def update(self, instance, validated_data):
            """Handle updating user account"""
            if 'password' in validated_data:
                password = validated_data.pop('password')
                instance.set_password(password)      
      