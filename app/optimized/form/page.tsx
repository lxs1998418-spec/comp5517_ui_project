'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StudentData } from '@/types';

interface FormData {
  name: string;
  studentId: string;
  major: string;
  grade: string;
  email: string;
  phone: string;
  address: string;
  enrollmentYear: string;
  gpa: string;
  status: string;
  gender: string;
  birthDate: string;
  ethnicity: string;
  idCard: string;
  emergencyContact: string;
  emergencyPhone: string;
  dormitory: string;
  advisor: string;
  researchDirection: string;
  hobbies: string;
  scholarship: string;
  clubMembership: string;
}

export default function OptimizedForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    studentId: '',
    major: '',
    grade: '',
    email: '',
    phone: '',
    address: '',
    enrollmentYear: '',
    gpa: '',
    status: '',
    gender: '',
    birthDate: '',
    ethnicity: '',
    idCard: '',
    emergencyContact: '',
    emergencyPhone: '',
    dormitory: '',
    advisor: '',
    researchDirection: '',
    hobbies: '',
    scholarship: '',
    clubMembership: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('optimized_detailStudent');
    if (stored) {
      const student: StudentData = JSON.parse(stored);
      setFormData({
        name: student.name || '',
        studentId: student.studentId || '',
        major: student.major || '',
        grade: student.grade || '',
        email: student.email || '',
        phone: student.phone || '',
        address: student.address || '',
        enrollmentYear: student.enrollmentYear?.toString() || '',
        gpa: student.gpa?.toString() || '',
        status: student.status || '',
        gender: '',
        birthDate: '',
        ethnicity: '',
        idCard: '',
        emergencyContact: '',
        emergencyPhone: '',
        dormitory: '',
        advisor: '',
        researchDirection: '',
        hobbies: '',
        scholarship: '',
        clubMembership: '',
      });
    }
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (step === 1) {
      if (!formData.name) newErrors.name = '姓名必填';
      if (!formData.studentId) newErrors.studentId = '学号必填';
    } else if (step === 2) {
      if (!formData.major) newErrors.major = '专业必填';
      if (!formData.grade) newErrors.grade = '成绩必填';
      if (!formData.enrollmentYear) newErrors.enrollmentYear = '入学年份必填';
    } else if (step === 3) {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '请输入有效的邮箱地址';
      }
      if (!formData.phone || !/^\d{11}$/.test(formData.phone)) {
        newErrors.phone = '请输入11位手机号码';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowPreview(true);
      }
    }
  };

  const handleSubmit = () => {
    // 存储表单数据
    sessionStorage.setItem('optimized_formData', JSON.stringify(formData));
    router.push('/optimized/confirm');
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      return newData;
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-black">预览摘要</h2>
          <div className="space-y-2 mb-6 text-black">
            <p><strong>姓名:</strong> {formData.name}</p>
            <p><strong>学号:</strong> {formData.studentId}</p>
            <p><strong>专业:</strong> {formData.major}</p>
            <p><strong>成绩:</strong> {formData.grade}</p>
            <p><strong>GPA:</strong> {formData.gpa || '未填写'}</p>
            <p><strong>邮箱:</strong> {formData.email}</p>
            <p><strong>电话:</strong> {formData.phone}</p>
            <p><strong>性别:</strong> {formData.gender || '未填写'}</p>
            <p><strong>出生日期:</strong> {formData.birthDate || '未填写'}</p>
            <p><strong>紧急联系人:</strong> {formData.emergencyContact || '未填写'}</p>
            <p><strong>导师:</strong> {formData.advisor || '未填写'}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowPreview(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg"
            >
              返回修改
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              确认提交
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300'
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-black">
            <span>基础字段</span>
            <span>学术信息</span>
            <span>联系方式</span>
            <span>详细信息</span>
            <span>其他信息</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Step 1: 基础字段</h2>
              <div>
                <label className="block text-sm font-medium mb-1">姓名 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
                <p className="text-xs text-black mt-1">请输入学生姓名</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">学号 *</label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => updateField('studentId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.studentId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.studentId && (
                  <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Step 2: 学术信息</h2>
              <div>
                <label className="block text-sm font-medium mb-1">专业 *</label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => updateField('major', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.major ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.major && (
                  <p className="text-red-500 text-sm mt-1">{errors.major}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">成绩 *</label>
                <select
                  value={formData.grade}
                  onChange={(e) => updateField('grade', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.grade ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">请选择</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                </select>
                {errors.grade && (
                  <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">入学年份 *</label>
                <input
                  type="number"
                  value={formData.enrollmentYear}
                  onChange={(e) => updateField('enrollmentYear', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.enrollmentYear ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.enrollmentYear && (
                  <p className="text-red-500 text-sm mt-1">{errors.enrollmentYear}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GPA</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.gpa}
                  onChange={(e) => updateField('gpa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="例如：3.8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">学籍状态</label>
                <select
                  value={formData.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="active">在读</option>
                  <option value="graduated">已毕业</option>
                  <option value="suspended">已停学</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">居住地址</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="请输入详细地址"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Step 3: 联系方式</h2>
              <div>
                <label className="block text-sm font-medium mb-1">邮箱 *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
                <p className="text-xs text-black mt-1">请输入有效的邮箱地址</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">电话 *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
                <p className="text-xs text-black mt-1">请输入11位手机号码</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">紧急联系人姓名</label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => updateField('emergencyContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="请输入紧急联系人姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">紧急联系人电话</label>
                <input
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => updateField('emergencyPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="11位手机号码"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Step 4: 详细信息</h2>
              <div>
                <label className="block text-sm font-medium mb-1">性别</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">请选择</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">出生日期</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateField('birthDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">民族</label>
                <input
                  type="text"
                  value={formData.ethnicity}
                  onChange={(e) => updateField('ethnicity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="例如：汉族"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">身份证号</label>
                <input
                  type="text"
                  value={formData.idCard}
                  onChange={(e) => updateField('idCard', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="18位身份证号码"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">宿舍号</label>
                <input
                  type="text"
                  value={formData.dormitory}
                  onChange={(e) => updateField('dormitory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="例如：A栋201"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">导师姓名</label>
                <input
                  type="text"
                  value={formData.advisor}
                  onChange={(e) => updateField('advisor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="请输入导师姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">研究方向</label>
                <input
                  type="text"
                  value={formData.researchDirection}
                  onChange={(e) => updateField('researchDirection', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="例如：人工智能、机器学习"
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Step 5: 其他信息</h2>
              <div>
                <label className="block text-sm font-medium mb-1">兴趣爱好</label>
                <input
                  type="text"
                  value={formData.hobbies}
                  onChange={(e) => updateField('hobbies', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="例如：篮球、阅读、音乐"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">奖学金情况</label>
                <input
                  type="text"
                  value={formData.scholarship}
                  onChange={(e) => updateField('scholarship', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="例如：国家奖学金、学业奖学金"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">社团/组织成员</label>
                <input
                  type="text"
                  value={formData.clubMembership}
                  onChange={(e) => updateField('clubMembership', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="例如：学生会、志愿者协会"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
            >
              上一步
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {currentStep === 5 ? '预览' : '下一步'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

